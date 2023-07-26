import { Server, Socket } from 'socket.io';
import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IPlayer from '../interfaces/IPlayer.ts';
import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import Game from '../models/Game.ts'
import hostHelpers from './hostHelpers.ts';
import Player from '../models/Player.ts';

export default (io: Server, socket: Socket) => {
  const onPlayerSubmitJoin = async (data) => {
    try {
      const name = data.name.trim();
      const gameId: number = data.gameId;
      const allPlayersInGame = await playerDb.getPlayers(gameId);
      const foundPlayer = allPlayersInGame.find(p => p.name === name);
      const playerWithNameAlreadyExists = !!foundPlayer;
      const allGames: IGame[] = await Game.find({});
      const foundGame = allGames.find(g => g.id === gameId);
      const joinableGame = foundGame?.gameState.state === GameStates.Lobby;

      if (!joinableGame) {
        socket.emit('join-error', 'Invalid Game ID');
      } else {
        if (playerWithNameAlreadyExists) {
          socket.emit('join-error', 'A player with that name has already joined.');
        } else {
          const newPlayerId = await playerDb.addPlayer(name, gameId, socket.id);
          const allPlayersInGame = await playerDb.getPlayers(gameId);
          const currentGameData = await hostDb.getGameData(gameId);
          if (currentGameData === null) {
            return;
          }

          const updatedPlayer = await playerDb.getPlayer(newPlayerId);
          io.to(updatedPlayer.playerSocketId).emit('player-next', { player: updatedPlayer });

          io.to(currentGameData.hostSocketId).emit('players-updated', {
            gameId: gameId,
            players: allPlayersInGame
          });

          socket.emit('join-success', newPlayerId);
        }
      }
    } catch (e) {
      console.error("Failed to add player: " + e);
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
        currentQuizQuestionIndex: currentQuizQuestionIndex,
        quizQuestionOptionsText: currentQuizQuestionIndex >= 0 ? gameData.quizQuestions[currentQuizQuestionIndex].optionsList : []
      };

      if (player) {
        await Player.updateOne({
          id: player.id
        }, { 
          $set: { 
            'playerSocketId': socket.id
          }
        });   
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
      } else {
        hostHelpers.onHostViewUpdate(gameId, io);
      }
    } catch (e) {
      socket.emit('player-submit-questionnaire-error', e);
    }
  };

  const onPlayerSubmitWyrQuestionnaire = async (data: any) => {
    try {
      const player: IPlayer = await playerDb.getPlayerBySocketId(socket.id);
      const gameId = player.gameId;
      // console.log(data); Works
      // console.log(data.question);
      // console.log(data.answer);
      await playerDb.playerCompleteWyrQuestionnaire(player.id, data.question, data.answer);
      socket.emit('player-submit-wyr-questionnaire-success');

      const allPlayersDone = await playerDb.checkAllPlayersDoneWithWyrQuestionnaire(gameId);
      hostHelpers.onHostWyrViewUpdate(gameId, io);
      if (allPlayersDone) {
        console.log("all players done with wyr questionnaire");
        await hostHelpers.hostStartWyr(gameId, io);
        //start quiz here!
        //await hostHelpers.hostStartQuiz(gameId, io);
      }
    } catch (e) {
      socket.emit('player-submit-wyr-questionnaire-error', e);
    }
  };

  const onPlayerAnswerQuestion = async (guess: number) => {
    try {
      const player: IPlayer = await playerDb.getPlayerBySocketId(socket.id);
      const gameData: IGame | null = await hostDb.getGameData(player.gameId);
      if (gameData === null) {
        throw `Game not found: ${player.gameId}`;
      }

      await playerDb.playerAnswerQuestion(player.id, guess, gameData);
      socket.emit('player-answer-question-success');

    } catch (e) {
      socket.emit('player-answer-question-error', e);
    }
  };

  const onHostKickPlayer = async (playerName: string) => {
    try {
      const player: IPlayer = await playerDb.getPlayerByName(playerName);
      const gameId = player.gameId;
      await playerDb.kickPlayer(playerName, gameId);
      const allPlayersInGame = await playerDb.getPlayers(gameId);
      const currentGameData = await hostDb.getGameData(gameId);
      if (currentGameData === null) {
        return;
      }

      io.to(currentGameData.hostSocketId).emit('players-updated', {
        gameId: gameId,
        players: allPlayersInGame
      });
      hostHelpers.onHostViewUpdate(gameId, io);
    } catch (e) {
      console.error("Failed to kick player: " + e);
    }}
  
  socket.on('host-kick-player', onHostKickPlayer);
  socket.on('player-submit-join', onPlayerSubmitJoin);
  socket.on('player-load', onPlayerLoad);
  socket.on('player-submit-questionnaire', onPlayerSubmitQuestionnaire);
  socket.on('player-submit-wyr-questionnaire', onPlayerSubmitWyrQuestionnaire);
  socket.on('player-answer-question', onPlayerAnswerQuestion);
}
