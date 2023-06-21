import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import playerHelpers from './playerHelpers.ts'
import { Server } from 'socket.io';
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
  // console.log("Guesses:")
  // console.log(guesses);
  //58Here
  //Sudo code:
  //Find the total correct answers via loop 
  //
  
  //Stores the score to add to the player's later
  let ScoreAdder = 0;
  let correctGuess = gameData.quizQuestions[gameData.currentQuestionIndex].correctAnswerIndex
  for (let i = 0; i < guesses.length; i++) {
    if (guesses[i].guess === correctGuess) {
      ScoreAdder += 100;
    }
  }

  

  //Update score by 100 for each right answer by others
  //identify player

  //update score on player
  let player = await playerDb.getPlayer(gameData.quizQuestions[gameData.currentQuestionIndex].playerId);
  // console.log ("Player: " + player.name);
  // console.log ("Player Score:");
  // console.log (player.score);
  // console.log ("Score added:");
  // console.log (ScoreAdder);
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

export default { hostStartQuiz, hostPreAnswer };
