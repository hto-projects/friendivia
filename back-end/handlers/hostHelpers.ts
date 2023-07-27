import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import playerHelpers from './playerHelpers.ts'
import { Server } from 'socket.io';
import Player from '../models/Player.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import Game from '../models/Game.ts';
import wyrquestion from '../db/wyrquestion.ts';

const PRE_QUIZ_MS = 5000;
const PRE_ANSWER_MS = 5000;
const PRE_LEADER_BOARD_MS = 5000;
let nextQuestionTimer;

const hostGoNext = async (gameId: number, io: Server): Promise<void> => {
  const currentGameData: IGame | null = await hostDb.getGameData(gameId);
  if (currentGameData === null) {
    return;
  }

  io.to(currentGameData.hostSocketId).emit('host-next', currentGameData);
}

const hostShowLeaderBoard = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.LeaderBoard);

  const playerScores = await playerDb.getPlayerScores(gameId);
  playerScores.sort((a, b) => b.score - a.score);
  const players = await playerDb.getPlayers(gameId);
  for(let i = 0; i < players.length; i++) {
    if (players[i].score === playerScores[0].score) {
      await playerDb.updatePlayerState(players[i].id, PlayerStates.RankOne, io, {});
    }
    else if (players[i].score === playerScores[1].score) {
      await playerDb.updatePlayerState(players[i].id, PlayerStates.RankTwo, io, {});
    }
    else if (players[i].score === playerScores[2].score) {
      await playerDb.updatePlayerState(players[i].id, PlayerStates.RankThree, io, {});
    }
    else{
      await playerDb.updatePlayerState(players[i].id, PlayerStates.LeaderBoard, io, {});
    }
  }

  const gameData: IGame | null = await hostDb.getGameData(gameId);
  if (gameData === null) {
    return;
  }
  
  io.to(gameData.hostSocketId).emit('host-next', { ...gameData, playerScores });
}

const hostPreLeaderBoard = async (gameId: number, io: Server): Promise<void> => {
  const playerScores = await playerDb.getPlayerScores(gameId);
  playerScores.sort((a, b) => b.score - a.score);
  if (playerScores[0].score === playerScores[1].score) {
    await hostDb.setGameState(gameId, GameStates.Tiebreaker);
    await hostGoNext(gameId, io);
    await new Promise(r => setTimeout(r, 10000));
    try {
      const questionnaireQuestionsText = await hostDb.moveGameToQuestionnaire(gameId, 1);
      await playerDb.updateAllPlayerStates(gameId, PlayerStates.FillingQuestionnaire, io, { questionnaireQuestionsText });
      await Game.updateOne({ id: gameId }, {
        $set: { 'currentQuestionIndex': -1 }
      });
      let playersInGame = await playerDb.getPlayers(gameId);
      playersInGame.map(p => p.quizGuesses = []);
      const currentGameData: IGame | null = await hostDb.getGameData(gameId);
      io.to(currentGameData!.hostSocketId).emit('host-next', {...currentGameData, playersInGame});
    } catch (e) {
      console.error(`Failed to go to questionnaire: ${e}`)
    }
  }
  else{
    const currentGameData: IGame | null = await hostDb.getGameData(gameId);
    if((currentGameData?.currentWyrQuestionIndex || 1) >= ((currentGameData?.wyrQuizQuestions.length|| 0) - 1)){
      await hostDb.setGameState(gameId, GameStates.PreLeaderBoard);
      setTimeout(hostShowLeaderBoard, PRE_LEADER_BOARD_MS, gameId, io);
    }
    else{
      console.log("Not showing leaderboard");
      await hostDb.setGameState(gameId, GameStates.PreWyr);
      await hostGoNext(gameId, io);
      const wyrQuestion = await wyrquestion.getQuestions();
      const text = wyrQuestion.map((question) => question.text);
      const as = wyrQuestion.map((question) => question.answerA);
      const bs = wyrQuestion.map((question) => question.answerB);
      await playerDb.updateAllPlayerStates(gameId, PlayerStates.PreWyr, io, {wyrQuestion: text, wyrA: as, wyrB: bs});
      setTimeout(hostShowWyrQuestionnaire, 5000, gameId, io);
    }
  }
}

const hostShowWyrQuestionnaire = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.WyrQuestionnaire);
  await playerDb.updateAllPlayerStates(gameId, PlayerStates.WyrQuestionnaire, io, {});
  await hostGoNext(gameId, io);
  // const currentGameData: IGame | null = await hostDb.getGameData(gameId);
  // const playersInGame = await playerDb.getPlayers(gameId);
  // io.to(currentGameData!.hostSocketId).emit('host-next', {...currentGameData, playersInGame});
}

const hostShowNextQuestion = async (gameId: number, io: Server): Promise<void> => {
  const currentGameData: IGame | null = await hostDb.getGameData(gameId);
  const shouldContinue = await hostDb.nextQuestion(gameId);
  let timePerQuestionMS: number;
  if (currentGameData?.settings.timePerQuestion === undefined) {
    console.error("Error: time per question undefined. Defaulted to 15 seconds.");
    timePerQuestionMS = 15000;
  }
  else {
    timePerQuestionMS = currentGameData?.settings.timePerQuestion * 1000;
  }
  const PLAYER_COMPLETE_QUIZ = timePerQuestionMS;
  

  if (shouldContinue) {
    await hostDb.setGameState(gameId, GameStates.ShowingQuestion);
    await hostGoNext(gameId, io);
    await playerHelpers.allPlayersGoToNextQuestion(gameId, io);
    nextQuestionTimer = setTimeout(hostPreAnswer, PLAYER_COMPLETE_QUIZ, gameId, io);
  } else {
    if(await hostDb.nextQuestion(gameId, true)){
      await hostDb.setGameState(gameId, GameStates.ShowingQuestion);
      await hostGoNext(gameId, io);
      await playerHelpers.allPlayersGoToNextQuestion(gameId, io, true);
      nextQuestionTimer = setTimeout(hostPreAnswer, PLAYER_COMPLETE_QUIZ, gameId, io);
    }
    else{
      await hostPreLeaderBoard(gameId, io);
    }
  }
}

const hostSkipTimer = async (gameId: number, io: Server): Promise<void> => {
  clearTimeout(nextQuestionTimer);
  hostPreAnswer(gameId, io);  
}

const hostStartQuiz = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.PreQuiz);
  const data = await hostDb.getGameData(gameId)
  const questions = data?.questionnaireQuestions;
  const numQuizQuestions = data?.settings.numQuizQuestions || 5;
  await hostDb.buildQuiz(gameId, questions, numQuizQuestions);
  await hostGoNext(gameId, io);
  setTimeout(hostShowNextQuestion, PRE_QUIZ_MS, gameId, io);
}

const hostStartWyr = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.PreQuiz);
  await hostDb.buildWyrQuiz(gameId);
  await hostGoNext(gameId, io);
  setTimeout(hostShowNextQuestion, PRE_QUIZ_MS, gameId, io, true);
}

const hostShowIntLeaderboard = async(gameId: number, io:Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.InterLeaderboard);

  const allPlayerScores = await playerDb.getPlayerScores(gameId);
  await playerDb.updateAllPlayerStates(gameId, PlayerStates.SeeingRank, io, {playerScores: allPlayerScores});
  
  const gameData = await hostDb.getGameData(gameId);
  if (gameData === null) {
    return;
  }
  const handsFreeMode = gameData.settings.handsFreeMode;
  const timePerLeaderboard = gameData.settings.timePerLeaderboard * 1000;
  io.to(gameData.hostSocketId).emit('host-next', { ...gameData, playerScores: allPlayerScores});

  if (handsFreeMode) {
    setTimeout(hostShowNextQuestion, timePerLeaderboard, gameId, io)
  }
}

const hostPreAnswer = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.PreAnswer);
  await hostGoNext(gameId, io);
  await playerHelpers.allPlayersTimesUp(gameId, io);

  setTimeout(hostShowAnswer, PRE_ANSWER_MS, gameId, io);
}

const hostShowAnswer = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.ShowingAnswer);
  const gameData = await hostDb.getGameData(gameId); 
  const handsFreeMode = gameData?.settings.handsFreeMode;
  const timePerAnswer = (gameData?.settings.timePerAnswer || 10) * 1000;  
  const currentQuestionIndex = gameData?.currentQuestionIndex || -1;
  const quizLength = gameData?.quizQuestions.length || 5;
  if (gameData === null) {
    return;
  }

  const players = await playerDb.getPlayers(gameId);
  var check;
  var isYou;
  var subjectPlayer;
  var guesses;
  if(gameData.quizQuestions.length <= gameData.currentQuestionIndex){
    guesses = await playerDb.getPlayerGuessesForQuizQuestion(gameId, gameData.currentWyrQuestionIndex);
    check = gameData?.wyrQuizQuestions[gameData!.currentWyrQuestionIndex].correctAnswerIndex;
    isYou = gameData?.wyrQuizQuestions[gameData!.currentWyrQuestionIndex].playerId;
    subjectPlayer = await playerDb.getPlayer(gameData?.wyrQuizQuestions[gameData!.currentWyrQuestionIndex].playerId);
    players.forEach(async (player) => {
      if (player.quizGuesses[gameData!.currentWyrQuestionIndex] == check) {
        await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswerCorrect, io, {});
      } else if(isYou == player.id){
        await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswer, io, {});
      }
      else
      {
        await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswerIncorrect, io, {});
      }
    });
  }
  else{
    guesses = await playerDb.getPlayerGuessesForQuizQuestion(gameId, gameData.currentQuestionIndex);
    check = gameData?.quizQuestions[gameData!.currentQuestionIndex].correctAnswerIndex;
    isYou = gameData?.quizQuestions[gameData!.currentQuestionIndex].playerId;
    subjectPlayer = await playerDb.getPlayer(gameData.quizQuestions[gameData.currentQuestionIndex].playerId);
    players.forEach(async (player) => {
      if (player.quizGuesses[gameData!.currentQuestionIndex] == check) {
        await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswerCorrect, io, {});
      } else if(isYou == player.id){
        await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswer, io, {});
      }
      else
      {
        await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswerIncorrect, io, {});
      }
    });
  }

  


  let ScoreAdder = 0;
  let correctGuess = check;
  for (let i = 0; i < guesses.length; i++) {
    if (guesses[i].guess === correctGuess && guesses[i].name !== subjectPlayer.name) {
      ScoreAdder += 100;
    }
  }

 await Player.updateOne({
    id: subjectPlayer.id
  }, { 
    $set: {
      'score' : subjectPlayer.score + ScoreAdder
    }
  });

  const playerScores = await playerDb.getPlayerScores(gameId)
  io.to(gameData.hostSocketId).emit('host-next', { ...gameData, quizQuestionGuesses: guesses, playerScores: playerScores});

  if (handsFreeMode) {
    setTimeout(() => {
      if ((currentQuestionIndex + 1) < quizLength) {
        hostShowIntLeaderboard(gameId, io);
      } else {
        hostShowNextQuestion(gameId, io);
      }
    }, timePerAnswer);
  }
}

const getQuestionnaireStatus = async (gameId:number): Promise<any> => {
  const allPlayersInGame = await playerDb.getPlayers(gameId);
  let donePlayers: any = [];
  let waitingPlayers: any = [];

  for (let i = 0; i < allPlayersInGame.length; i++) {
    const player = allPlayersInGame[i];
    if (player.playerState.state === 'submitted-questionnaire-waiting'){
      donePlayers.push(player.name);
    } else if (player.playerState.state === "filling-questionnaire"){
      waitingPlayers.push(player.name);
    }
  }

  return [donePlayers, waitingPlayers]
}

const getWyrQuestionnaireStatus = async (gameId:number): Promise<any> => {
  const allPlayersInGame = await playerDb.getPlayers(gameId);
  let donePlayers: any = [];
  let waitingPlayers: any = [];

  for (let i = 0; i < allPlayersInGame.length; i++) {
    const player = allPlayersInGame[i];
    if (player.playerState.state === 'submitted-wyr-questionnaire'){
      donePlayers.push(player.name);
    } else if (player.playerState.state === "wyr-questionnaire"){
      waitingPlayers.push(player.name);
    }
  }

  return [donePlayers, waitingPlayers]
}

const onHostViewUpdate = async(gameId, io: Server) => {
  const gameData = await hostDb.getGameData(gameId);

  if (gameData === null) {
    return;
  }

  try {
    const allPlayersDone = await playerDb.checkAllPlayersDoneWithQuestionnaire(gameId);
    if(!allPlayersDone){
      let playerStatusLists = await getQuestionnaireStatus(gameId);
      io.to(gameData.hostSocketId).emit('update-host-view', playerStatusLists);
    }
  } catch (e) {
    io.to(gameData.hostSocketId).emit("onHostViewUpdate-error", e);
  }
}

const onHostWyrViewUpdate = async(gameId, io: Server) => {
  const gameData = await hostDb.getGameData(gameId);

  if (gameData === null) {
    return;
  }

  try {
    const allPlayersDone = await playerDb.checkAllPlayersDoneWithWyrQuestionnaire(gameId);
    if(!allPlayersDone){
      let playerStatusLists = await getWyrQuestionnaireStatus(gameId);
      io.to(gameData.hostSocketId).emit('update-host-wyr-view', playerStatusLists);
    }
  } catch (e) {
    io.to(gameData.hostSocketId).emit("onHostViewUpdate-error", e);
  }}

export default { hostStartQuiz, hostPreAnswer, onHostViewUpdate, onHostWyrViewUpdate, hostShowNextQuestion, hostSkipTimer, hostStartWyr, hostShowIntLeaderboard };
