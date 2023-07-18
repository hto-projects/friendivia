import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import playerHelpers from './playerHelpers.ts'
import { Server } from 'socket.io';
//import { Socket } from 'socket.io'
import Player from '../models/Player.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';

const PRE_QUIZ_MS = 5000;
const SHOW_ANSWER_MS = 10000;
const PRE_ANSWER_MS = 5000;
const PRE_LEADER_BOARD_MS = 5000;

const hostGoNext = async (gameId: number, io: Server): Promise<void> => {
  const currentGameData: IGame | null = await hostDb.getGameData(gameId);
  if (currentGameData === null) {
    return;
  }

  io.to(currentGameData.hostSocketId).emit('host-next', currentGameData);
}

const hostShowLeaderBoard = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.LeaderBoard);
  await playerDb.updateAllPlayerStates(gameId, PlayerStates.LeaderBoard, io, {});

  const gameData: IGame | null = await hostDb.getGameData(gameId);
  if (gameData === null) {
    return;
  }
  
  const playerScores = await playerDb.getPlayerScores(gameId);
  io.to(gameData.hostSocketId).emit('host-next', { ...gameData, playerScores });
}

const hostPreLeaderBoard = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.PreLeaderBoard);
  await hostGoNext(gameId, io);
  await playerDb.updateAllPlayerStates(gameId, PlayerStates.PreLeaderBoard, io, {});
  setTimeout(hostShowLeaderBoard, PRE_LEADER_BOARD_MS, gameId, io);
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

const hostStartQuiz = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.PreQuiz);
  await hostDb.buildQuiz(gameId);
  await hostGoNext(gameId, io);
  setTimeout(hostShowNextQuestion, PRE_QUIZ_MS, gameId, io);
}

const hostPreAnswer = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.PreAnswer);
  await hostGoNext(gameId, io);

  setTimeout(hostShowAnswer, PRE_ANSWER_MS, gameId, io);
}

const hostShowAnswer = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.ShowingAnswer);
  await playerDb.updateAllPlayerStates(gameId, PlayerStates.SeeingAnswer, io, {});
  const gameData = await hostDb.getGameData(gameId);
  if (gameData === null) {
    return;
  }

  const guesses = await playerDb.getPlayerGuessesForQuizQuestion(gameId, gameData.currentQuestionIndex);

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
  io.to(gameData.hostSocketId).emit('host-next', { ...gameData, quizQuestionGuesses: guesses});
  setTimeout(hostShowNextQuestion, SHOW_ANSWER_MS, gameId, io);
}

const getQuestionnaireStatus = async (gameId:number): Promise<any> => {
  const allPlayersInGame = await playerDb.getPlayers(gameId);
  console.log(allPlayersInGame, "allPlayersInGame")
  let donePlayers: any = [];
  let waitingPlayers: any = [];

  for (let i = 0; i < allPlayersInGame.length; i++) {
    const player = allPlayersInGame[i];
    console.log(player.name)
    if (player.playerState.state === 'submitted-questionnaire-waiting'){
      donePlayers.push(player.name);
    } else if (player.playerState.state === "filling-questionnaire"){
      waitingPlayers.push(player.name);
    }
  }

  console.log(donePlayers, waitingPlayers, "in playerHelper, checking done and waiting lists")
  return [donePlayers, waitingPlayers]
}

const onHostViewUpdate = async(gameId, io: Server) => {
  const gameData = await hostDb.getGameData(gameId);

  if (gameData === null) {
    return;
  }

  try {
    console.log("reaches host handler update")
    const allPlayersDone = await playerDb.checkAllPlayersDoneWithQuestionnaire(gameId);
    if(!allPlayersDone){
      console.log("before going to helper for statuses")
      let playerStatusLists = await getQuestionnaireStatus(gameId);
      console.log("after getting statuses, ", playerStatusLists)
      io.to(gameData.hostSocketId).emit('update-host-view', playerStatusLists);
    }
  } catch (e) {
    io.to(gameData.hostSocketId).emit("onHostViewUpdate-error", e);
  }
}

export default { hostStartQuiz, hostPreAnswer, onHostViewUpdate };
