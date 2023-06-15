import { Server, Socket } from 'socket.io';
import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IPlayer from '../interfaces/IPlayer.ts';
import IGame from '../interfaces/IGame.ts';
import hostHelpers from './hostHelpers.ts';

export default (io: Server, socket: Socket) => {
  const onPlayerSubmitJoin = async (data) => {
    try {
      const name = data.name;
      const gameId: number = data.gameId;
      const allPlayersInGame = await playerDb.getPlayers(gameId);
      const foundPlayer = allPlayersInGame.find(p => p.name === name);
      const playerWithNameAlreadyExists = !!foundPlayer;
      const allActiveGameIds = await hostDb.getAllGameIds();
      const foundGame = allActiveGameIds.find(g => g === gameId);
      const gameExists = !!foundGame;

      if (playerWithNameAlreadyExists) {
        socket.emit('join-error', 'A player with that name has already joined.');
      } else {
        if (!gameExists) {
          socket.emit('join-error', 'Invalid Game ID');
        } else {
          const newPlayerId = await playerDb.addPlayer(name, gameId, socket.id);
          const allPlayersInGame = await playerDb.getPlayers(gameId);
          const currentGameData = await hostDb.getGameData(gameId);
          if (currentGameData === null) {
            return;
          }

          io.to(currentGameData.hostSocketId).emit('players-updated', {
            gameId: gameId,
            players: allPlayersInGame
          });

          socket.emit('join-success', newPlayerId);
        }
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
      if (gameData === null) {
        return;
      }

      const currentQuizQuestionIndex = gameData.currentQuestionIndex;
      const extraData = {
        questionnaireQuestionsText: gameData.questionnaireQuestions.map(q => q.text),
        quizQuestionOptionsText: currentQuizQuestionIndex >= 0 ? gameData.quizQuestions[currentQuizQuestionIndex].optionsList : []
      };

      if (player) {
        socket.emit('player-load-success', { player, extraData });
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
      await playerDb.playerCompleteQuestionnaire(player.id, answers);
      socket.emit('player-submit-questionnaire-success');

      const allPlayersDone = await playerDb.checkAllPlayersDoneWithQuestionnaire(gameId);
      if (allPlayersDone) {
        await hostHelpers.hostStartQuiz(gameId, io);
      }
    } catch (e) {
      socket.emit('player-submit-questionnaire-error', e);
    }
  };

  const onPlayerAnswerQuestion = async (guess: number) => {
    try {
      const player: IPlayer = await playerDb.getPlayerBySocketId(socket.id);
      const gameId = player.gameId;
      const gameData: IGame | null = await hostDb.getGameData(player.gameId);
      if (gameData === null) {
        throw `Game not found: ${player.gameId}`;
      }

      await playerDb.playerAnswerQuestion(player.id, guess, gameData);
      socket.emit('player-answer-question-success');

      const allPlayersDone = await playerDb.checkAllPlayersAnsweredQuizQuestion(gameId);
      if (allPlayersDone) {
        await hostHelpers.hostShowAnswer(gameId, io);
      }
    } catch (e) {
      socket.emit('player-answer-question-error', e);
    }
  };

  socket.on('player-submit-join', onPlayerSubmitJoin);
  socket.on('player-load', onPlayerLoad);
  socket.on('player-submit-questionnaire', onPlayerSubmitQuestionnaire);
  socket.on('player-answer-question', onPlayerAnswerQuestion);
}
