import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IGame from '../interfaces/IGame.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import { Server } from 'socket.io';

export default {
  allPlayersGoNext: async (gameId: number, io: Server): Promise<void> => {
    const currentGameData: IGame | null = await hostDb.getGameData(gameId);
    if (currentGameData === null) {
      return;
    }

    const currentQuestionIndex = currentGameData.currentQuestionIndex;
    const quizQuestionOptionsText: string[] = currentGameData.quizQuestions[currentQuestionIndex].optionsList || [];

    await playerDb.updateAllPlayerStates(gameId, PlayerStates.SeeingQuestion, io, { quizQuestionOptionsText });
  }
}
