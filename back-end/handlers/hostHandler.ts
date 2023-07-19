import { Socket } from 'socket.io';
import hostDb from '../db/host.ts';
import playerDb from '../db/player.ts';
import questionDb from '../db/question.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import IGame from '../interfaces/IGame.ts';
import IPreGameSettings from '../interfaces/IPreGameSettings.ts';
import Game from '../models/Game.ts';
import q from '../db/question.ts';
import hostHelpers from './hostHelpers.ts';
import Player from '../models/Player.ts';
import IPlayer from '../interfaces/IPlayer.ts';
import PreGameSettings from '../models/PreGameSettings.ts';

var GameId ;
var PreSettingsId;
export default (io, socket: Socket) => {
  const onHostOpen = async () => {
    try {
      const newGameId = await hostDb.hostOpenGame(socket.id, PreSettingsId);
      GameId = newGameId;
      await q.addBaseQuestions();
      socket.emit('host-open-success', newGameId);
    } catch (e) {
      socket.emit('host-open-error', e);
    }
  };

  const onHostLoad = async (gameId: number) => {
    if (gameId === -1) {
      return;
    }

    try {
      const dataForGame: any = await hostDb.getGameData(gameId);
      if (dataForGame) {     
        const data = dataForGame;
        const quizQuestionGuesses = await playerDb.getPlayerGuessesForQuizQuestion(gameId, data.currentQuestionIndex);
        const playerScores = await playerDb.getPlayerScores(gameId);
        
        const playersInGame = await playerDb.getPlayers(gameId);
        await Game.updateOne({
          id: gameId
        }, { 
          $set: { 
            'hostSocketId': socket.id
          }
        });  
        socket.emit('host-load-success', {...data, quizQuestionGuesses, playerScores, playersInGame});
        socket.emit('players-updated', {
          gameId: gameId,
          players: playersInGame
        });
            }
    } catch (e) {
      socket.emit('host-load-error', e);
    }
  };

  const onSettingsLoad = async (preSettingsId: string) => {
    if (preSettingsId === '-1') {
      return;
    }

    try {
      const dataForSettings: any = await hostDb.getPreSettingsData(preSettingsId);
      if (dataForSettings) {     
        const data = dataForSettings;
        await PreGameSettings.updateOne({
          id: preSettingsId
        }, { 
          $set: { 
            'hostSocketId': socket.id
          }
        });  
        socket.emit('settings-load-success', data);
      }
    } catch (e) {
      socket.emit('settings-load-error', e);
    }
  };

  const onDeletePlease = async () => {
    try {
      await playerDb.deleteAllPlayers();
      await hostDb.deleteAllGames();
      await questionDb.deleteAllQuestions();
    } catch (e) {
      console.error("failed to delete all");
    }
  };

  const onHostStart = async (gameId) => {
    try {
      if ((await playerDb.getPlayers(gameId)).length >= 2) {
      const questionnaireQuestionsText = await hostDb.moveGameToQuestionnaire(gameId);
      await playerDb.updateAllPlayerStates(gameId, PlayerStates.FillingQuestionnaire, io, { questionnaireQuestionsText });
      const currentGameData: IGame | null = await hostDb.getGameData(gameId);
      let playersInGame = await playerDb.getPlayers(gameId);
      io.to(currentGameData?.hostSocketId).emit('host-next', {...currentGameData, playersInGame});
      } else{console.log("Need at least two players")}
    } catch (e) {
      console.error(`Failed to go to questionnaire: ${e}`)
    }
  }

  const playAgain = async (gameId) => {
    try {
      hostDb.deleteGame(gameId);
      onHostOpen();
    } catch (e) {
      console.error(`Failed to delete game: ${e}`)
    }
  }

  const onNextQuestion = async (gameId) => {
    try {
      hostHelpers.hostShowNextQuestion(gameId, io);
    } catch (e) {
      console.error(`Failed to move to next question: ${e}`)
    }
  }

  const onTimerSkip = async (gameId) => {
    try {
      hostHelpers.hostSkipTimer(gameId, io);
    } catch(e) {
      console.error(`Failed to skip timer: ${e}`)
    }
  }

  const allPlayersAnsweredQuestion = async (guess: number) => {
    try {
      const player: IPlayer = await playerDb.getPlayerBySocketId(socket.id);
      const gameData: IGame | null = await hostDb.getGameData(player.gameId);
      if (gameData === null) {
        throw `Game not found: ${player.gameId}`;
      }
      await playerDb.playerAnswerQuestion(player.id, guess, gameData);
      var ContinueGame = true;
      const allPlayersInGame = await Player.find({gameId: GameId});
      for(let p=0; p<allPlayersInGame.length; p++){
        if(allPlayersInGame[p].playerState.state != PlayerStates.AnsweredQuizQuestionWaiting && allPlayersInGame[p].playerState.state != PlayerStates.QuestionAboutMe){
          ContinueGame = false;
          break;
        }
      }
      if(ContinueGame){
        await hostHelpers.hostSkipTimer(GameId, io);
      }
    } catch(e) {
      console.error(`Failed to check if all players answered quiz question: ${e}`)
    }
  }

  const onHostSettings = async (gameId = null) => {
    try {
      if (gameId != null) {
        await hostDb.setGameState(gameId, GameStates.Settings);
        const currentGameData: IGame | null = await hostDb.getGameData(gameId);
        io.to(currentGameData?.hostSocketId).emit('host-next', currentGameData);
      } else {
        console.error(`Failed to find game for Host Settings`)
      }
    } catch(e) {
      console.error(`Failed to open host settings: ${e}`)
    }
  }

  const onHostBack = async (gameId, settingsData) => {
    try {
      await hostDb.setGameState(gameId, GameStates.Lobby);
      await hostDb.updateSettings(gameId, settingsData);
      const currentGameData: IGame | null = await hostDb.getGameData(gameId);
      await io.to(currentGameData?.hostSocketId).emit('host-next', currentGameData);
      const allPlayersInGame = await playerDb.getPlayers(gameId);
      io.to(currentGameData?.hostSocketId).emit('players-updated', {
        gameId: gameId,
        players: allPlayersInGame
      });
    } catch(e) {
      console.error(`Failed to go back: ${e}`)
    }
  }

  const onHostPreSettings = async () => {
    try {
      if (!PreSettingsId) {
        const newSettingsId = await hostDb.hostOpenPreSettings(socket.id);
        PreSettingsId = newSettingsId;
      }
      await hostDb.setSettingsState(PreSettingsId, true);
      socket.emit('host-presettings-success', PreSettingsId);
    } catch (e) {
      socket.emit('host-presettings-error', e);
    }
  }

  const onHostPSBack = async (preSettingsId, preSettingsData) => {
    try {
      await hostDb.hostClosePreSettings(preSettingsId, preSettingsData);
      const currentSettingsData: IPreGameSettings | null = await hostDb.getPreSettingsData(preSettingsId);
      io.to(currentSettingsData?.hostSocketId).emit('presettings-close', currentSettingsData);
    } catch(e) {
      console.error(`Failed to go back: ${e}`)
    }
  }

  socket.on('host-open', onHostOpen);
  socket.on('host-load', onHostLoad);
  socket.on('settings-load', onSettingsLoad);
  socket.on('delete-please', onDeletePlease);
  socket.on('host-start', onHostStart);
  socket.on('play-again', playAgain);
  socket.on('next-question', onNextQuestion);
  socket.on('timer-skip', onTimerSkip);
  socket.on('check-all-players-answered', allPlayersAnsweredQuestion);
  socket.on('host-settings', onHostSettings);
  socket.on('host-back', onHostBack);
  socket.on('host-pre-settings', onHostPreSettings);
  socket.on('host-ps-back', onHostPSBack);}
