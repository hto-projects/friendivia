import { Socket } from 'socket.io';
import hostDb from '../db/host.ts';
import playerDb from '../db/player.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import IGame from '../interfaces/IGame.ts';

export default (io, socket: Socket) => {
  const onHostStart = async () => {
    try {
      const newGameId = await hostDb.hostNewGame(socket.id);
      socket.emit('host-start-success', newGameId);
    } catch (e) {
      socket.emit('host-start-error', e);
    }
  };

  const onHostLoad = async (gameId: number) => {
    if (gameId === -1) {
      return;
    }

    try {
      const dataForGame = await hostDb.getGameData(gameId);
      if (dataForGame) {
        socket.emit('host-load-success', dataForGame);
        const playersForGame = await playerDb.getPlayers(gameId);
        socket.emit('players-updated', {
          gameId: gameId,
          players: playersForGame
        });
      }
    } catch (e) {
      socket.emit('host-load-error', e);
    }
  };

  const onDeletePlease = async () => {
    try {
      await playerDb.deleteAllPlayers();
      await hostDb.deleteAllGames();
    } catch (e) {
      console.error("failed to delete all");
    }
  };

  const onHostGoToQuestionnaire = async (gameId) => {
    try {
      await hostDb.moveGameToQuestionnaire(gameId);
      await playerDb.updateAllPlayerStates(gameId, PlayerStates.FillingQuestionnaire, io);
      const currentGameData: IGame | null = await hostDb.getGameData(gameId);
      io.to(currentGameData?.hostSocketId).emit('host-next', currentGameData);
    } catch (e) {
      console.error(`Failed to go to questionnaire: ${e}`)
    }
  }

  socket.on('host-start', onHostStart);
  socket.on('host-load', onHostLoad);
  socket.on('delete-please', onDeletePlease);
  socket.on('host-go-to-questionnaire', onHostGoToQuestionnaire);
}
