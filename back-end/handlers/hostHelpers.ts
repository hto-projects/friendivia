import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import playerHelpers from './playerHelpers.ts'
import { Server } from 'socket.io';
//import { Socket } from 'socket.io'
import Player from '../models/Player.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import Game from '../models/Game.ts';

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
      var playersInGame = await playerDb.getPlayers(gameId);
      const currentGameData: IGame | null = await hostDb.getGameData(gameId);
      io.to(currentGameData!.hostSocketId).emit('host-next', {...currentGameData, playersInGame});
    } catch (e) {
      console.error(`Failed to go to questionnaire: ${e}`)
    }
  }
  else{
    await hostDb.setGameState(gameId, GameStates.PreLeaderBoard);
    await hostGoNext(gameId, io);
    await playerDb.updateAllPlayerStates(gameId, PlayerStates.PreLeaderBoard, io, {});
    setTimeout(hostShowLeaderBoard, PRE_LEADER_BOARD_MS, gameId, io);
  }
}

const hostStartQuizTimer = async (gameId: number, io: Server): Promise<void> => {
  const currentGameData: IGame | null = await hostDb.getGameData(gameId);
  let timePerQuestionMS: number;
  if (currentGameData?.settings.timePerQuestion === undefined) {
    console.error("Error: time per question undefined. Defaulted to 15 seconds.");
    timePerQuestionMS = 15000;
  }
  else {
    timePerQuestionMS = currentGameData?.settings.timePerQuestion * 1000;
  }

  playerHelpers.allPlayersQuizTimerStarted(gameId, io);
  nextQuestionTimer = setTimeout(hostPreAnswer, timePerQuestionMS, gameId, io);
}

const hostShowNextQuestion = async (gameId: number, io: Server): Promise<void> => {
  const shouldContinue = await hostDb.nextQuestion(gameId);

  if (shouldContinue) {
    await hostDb.setGameState(gameId, GameStates.ShowingQuestion);
    await hostGoNext(gameId, io);
    await playerHelpers.allPlayersGoToNextQuestion(gameId, io);
  } else {
    await hostPreLeaderBoard(gameId, io);
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
  const guesses = await playerDb.getPlayerGuessesForQuizQuestion(gameId, gameData.currentQuestionIndex);


  players.forEach(async (player) => {
    if (gameData?.quizQuestions[gameData!.currentQuestionIndex].playerId == player.id) {
      await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswer, io, {});
    } else if(player.quizGuesses[gameData!.currentQuestionIndex] == gameData?.quizQuestions[gameData!.currentQuestionIndex].correctAnswerIndex){
      await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswerCorrect, io, {});
    } else {
      await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswerIncorrect, io, {});
    }
  });

  let ScoreAdder = 0;
  let correctGuess = gameData.quizQuestions[gameData.currentQuestionIndex].correctAnswerIndex
  for (let i = 0; i < guesses.length; i++) {
    if (guesses[i].guess === correctGuess) {
      ScoreAdder += 100;
    }
  }

  let player = await playerDb.getPlayer(gameData.quizQuestions[gameData.currentQuestionIndex].playerId);

 await Player.updateOne({
    id: gameData.quizQuestions[gameData.currentQuestionIndex].playerId
  }, { 
    $set: {
      'score' : player.score + ScoreAdder
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

export default { hostStartQuiz, hostPreAnswer, onHostViewUpdate, hostShowNextQuestion, hostSkipTimer, hostShowIntLeaderboard, hostStartQuizTimer };
