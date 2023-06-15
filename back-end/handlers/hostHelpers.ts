import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import playerHelpers from './playerHelpers.ts'
import { Server } from 'socket.io';
import { PlayerStates } from '../interfaces/IPlayerState.ts';

const hostGoNext = async (gameId: number, io: Server): Promise<void> => {
  const currentGameData: IGame | null = await hostDb.getGameData(gameId);
  if (currentGameData === null) {
    return;
  }

  io.to(currentGameData.hostSocketId).emit('host-next', currentGameData);
}

const hostStartQuiz = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.PreQuiz);
  await hostDb.buildQuiz(gameId);
  await hostGoNext(gameId, io);
  setTimeout(async () => {
    await hostDb.setGameState(gameId, GameStates.ShowingQuestion);
    await hostDb.nextQuestion(gameId);
    await hostGoNext(gameId, io);
    await playerHelpers.allPlayersGoNext(gameId, io);
  }, 5000);
}

const hostShowAnswer = async (gameId: number, io: Server): Promise<void> => {
  await hostDb.setGameState(gameId, GameStates.PreAnswer);
  await hostGoNext(gameId, io);

  setTimeout(async () => {
    await hostDb.setGameState(gameId, GameStates.ShowingAnswer);
    await playerDb.updateAllPlayerStates(gameId, PlayerStates.SeeingAnswer, io, {});
    const gameData = await hostDb.getGameData(gameId);
    if (gameData === null) {
      return;
    }
  
    const guesses = await playerDb.getPlayerGuessesForQuizQuestion(gameId, gameData.currentQuestionIndex);
    
    io.to(gameData.hostSocketId).emit('host-next', { ...gameData, quizQuestionGuesses: guesses});
  }, 5000)
}

export default { hostStartQuiz, hostShowAnswer };
