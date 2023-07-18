import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import playerHelpers from './playerHelpers.ts'
import { Server } from 'socket.io';
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
      const currentGameData: IGame | null = await hostDb.getGameData(gameId);
      await Game.updateOne({ id: gameId }, {
        $set: { 'currentQuestionIndex': -1 }
      });
      io.to(currentGameData!.hostSocketId).emit('host-next', currentGameData);
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

const hostShowNextQuestion = async (gameId: number, io: Server): Promise<void> => {
  const currentGameData: IGame | null = await hostDb.getGameData(gameId);
  const shouldContinue = await hostDb.nextQuestion(gameId);

  if (currentGameData?.settings.timePerQuestion === undefined) {
    return;
  }

  const PLAYER_COMPLETE_QUIZ = currentGameData?.settings.timePerQuestion * 1000;
  console.log(PLAYER_COMPLETE_QUIZ);

  if (shouldContinue) {
    await hostDb.setGameState(gameId, GameStates.ShowingQuestion);
    await hostGoNext(gameId, io);
    await playerHelpers.allPlayersGoToNextQuestion(gameId, io);
    nextQuestionTimer = setTimeout(hostPreAnswer, PLAYER_COMPLETE_QUIZ, gameId, io);
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
  await hostDb.buildQuiz(gameId, questions);
  await hostGoNext(gameId, io);
  setTimeout(hostShowNextQuestion, PRE_QUIZ_MS, gameId, io);
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
  if (gameData === null) {
    return;
  }

  const players = await playerDb.getPlayers(gameId);
  players.forEach(async (player) => {
    if (player.quizGuesses[gameData!.currentQuestionIndex] == gameData?.quizQuestions[gameData!.currentQuestionIndex].correctAnswerIndex) {
      await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswerCorrect, io, {});
    } else if(gameData?.quizQuestions[gameData!.currentQuestionIndex].playerId == player.id){
      await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswer, io, {});
    }
    else
    {
      await playerDb.updatePlayerState(player.id, PlayerStates.SeeingAnswerIncorrect, io, {});
    }
  });

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
}

export default { hostStartQuiz, hostPreAnswer, hostShowNextQuestion, hostSkipTimer };
