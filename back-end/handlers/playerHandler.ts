import { Socket } from 'socket.io';
import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IPlayer from '../interfaces/IPlayer.ts';
import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';

export default (io, socket: Socket) => {
  const onPlayerSubmitJoin = async (data) => {
    try {
      const name = data.name;
      const gameId: number = data.gameId;
      const playerWithNameAlreadyExists = !!(await playerDb.getPlayers(gameId)).find(p => p.name === name);
      if (playerWithNameAlreadyExists) {
        socket.emit('join-error', 'A player with that name has already joined.');
      } else {
        const newPlayerId = await playerDb.addPlayer(name, gameId, socket.id);
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
      const player: IPlayer = await playerDb.getPlayer(playerId);
      const gameData: IGame | null = await hostDb.getGameData(player.gameId);
      if (player) {
        socket.emit('player-load-success', { player, gameData });
      } else {
        socket.emit('player-load-error', 'player not found');
      }
    } catch (e) {
      socket.emit('player-load-error', e);
    }
  };

  const onPlayerSubmitQuestionnaire = async (answers: string []) => {
    try {
      const player: IPlayer = await playerDb.getPlayerBySocketId(socket.id);
      const gameId = player.gameId;
      await playerDb.playerAnswerQuestionnaire(player.id, answers);
      socket.emit('player-submit-questionnaire-success');

      const allPlayersDone = await playerDb.checkAllPlayersDoneWithQuestionnaire(gameId);
      if (allPlayersDone) {
        await hostDb.setGameState(gameId, GameStates.PreQuiz);
        const currentGameData: IGame | null = await hostDb.getGameData(gameId);
        io.to(currentGameData?.hostSocketId).emit('host-next', currentGameData);
      }
    } catch (e) {
      socket.emit('player-submit-questionnaire-error', e);
    }
  };

  socket.on('player-submit-join', onPlayerSubmitJoin);
  socket.on('player-load', onPlayerLoad);
  socket.on('player-submit-questionnaire', onPlayerSubmitQuestionnaire);
}
