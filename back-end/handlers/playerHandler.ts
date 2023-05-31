import playerDb from '../db/player.ts';

export default (io, socket) => {
  const onPlayerSubmitJoin = async (data) => {
    try {
      const name = data.name;
      const gameId: number = data.gameId;
      const playerWithNameAlreadyExists = !!(await playerDb.getPlayers(gameId)).find(p => p.name === name);
      if (playerWithNameAlreadyExists) {
        socket.emit('join-error', 'A player with that name has already joined.');
      } else {
        const newPlayerId = await playerDb.addPlayer(name, gameId);
        const allPlayersInGame = await playerDb.getPlayers(gameId);
        io.emit('players-updated', {
          gameId: gameId,
          players: allPlayersInGame
        });

        socket.emit('join-success', newPlayerId);
      }
    } catch (e) {
      console.error("failed to add player");
    }
  };

  const onPlayerLoad = async (playerId: string | undefined) => {
    if (!playerId) {
      return;
    }

    try {
      const player = await playerDb.getPlayer(playerId);
      if (player) {
        socket.emit('player-load-success', player);
      } else {
        socket.emit('player-load-error', 'player not found');
      }
    } catch (e) {
      socket.emit('player-load-error', e);
    }
  };

  socket.on('player-submit-join', onPlayerSubmitJoin);
  socket.on('player-load', onPlayerLoad);
}
