import hostDb from '../db/host.ts';
import playerDb from '../db/player.ts';

export default (socket) => {
  const onHostStart = async () => {
    try {
      const newGameId = await hostDb.hostNewGame();
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

  socket.on('host-start', onHostStart);
  socket.on('host-load', onHostLoad);
  socket.on('delete-please', onDeletePlease);
}
