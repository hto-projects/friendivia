import IGame from '../interfaces/IGame.ts';
import IPreGameSettings from '../interfaces/IPreGameSettings.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import Game from '../models/Game.ts';
import PreGameSettings from '../models/PreGameSettings.ts';
import * as utilDb from '../db/utils.ts';
import IQuizQuestion from '../interfaces/IQuizQuestion.ts';
import playerDb from '../db/player.ts';
import * as uuid from 'uuid';
import Player from '../models/Player.ts';
import friendsQuestions from './friendsTriviaQuestions.ts';
import IPlayer from '../interfaces/IPlayer.ts';
import { PlayerQuestionnaire } from '../interfaces/IQuestionnaireQuestion.ts';

export default {
  getAllGameIds: async (): Promise<number[]> => {
    try {
      const allGames = await Game.find({});
      return allGames.map(g => g.id);
    } catch (e) {
      console.error(`Issue getting all game ids: ${e}`);
      return [];
    }
  },

  getPreSettingsData: async (preSettingsId: string): Promise<IPreGameSettings | null> => {
    try {
      const settingsData: any = await PreGameSettings.findOne({id: preSettingsId});
      return settingsData?.toObject();
    } catch (e) {
      console.error(`Issue getting game data: ${e}`);
      return null;
    }
  },

  hostOpenGame: async function(socketId: string, customMode: string): Promise<number> {
    try {
      const timePerQuestion = 15;
      const numQuestionnaireQuestions = 5;
      const numQuizQuestions = 5;
      const handsFreeMode = false;
      const timePerAnswer = 10;
      const timePerLeaderboard = 5;
      const prioritizeCustomQs = false;
      const customQuestions = [];

      let newId = -1;
      while (true) {
        const testId = Math.floor(Math.random() * 9000 + 1000);
        const gameExists = await Game.exists({id: testId});
        if (!gameExists) {
          newId = testId;
          break;
        }
      }

      const newGameObject: IGame = {
        id: newId,
        gameState: {
          state: GameStates.Lobby,
          message: ''
        },
        hostSocketId: socketId,
        playerQuestionnaires: [],
        quizQuestions: [],
        currentQuestionIndex: -1,
        settings: {
          timePerQuestion: timePerQuestion,
          numQuestionnaireQuestions: numQuestionnaireQuestions,
          numQuizQuestions: numQuizQuestions,
          handsFreeMode: handsFreeMode,
          timePerAnswer: timePerAnswer,
          timePerLeaderboard: timePerLeaderboard,
          prioritizeCustomQs: prioritizeCustomQs,
          customQuestions: customQuestions
        },
        customMode: customMode
      };

      const newGame = new Game(newGameObject);
      await newGame.save();

      return newId;
    } catch (e) {
      console.error(`Issue creating new game: ${e}`);
      return -1;
    }
  },

  getGameData: async (gameId: number): Promise<IGame | null> => {
    try {
      const gameData: any = await Game.findOne({id: gameId});
      return gameData?.toObject();
    } catch (e) {
      console.error(`Issue getting game data: ${e}`);
      return null;
    }
  },

  getGameDataFromSocketId: async (socketId: string): Promise<IGame | null> => {
    try {
      const gameData: any = await Game.findOne({hostSocketId: socketId});
      return gameData?.toObject();
    } catch (e) {
      console.error(`Issue getting game data from Host SocketId ${socketId}: ${e}`);
      return null;
    }
  },

  setGameState: async (gameId: number, newState: GameStates): Promise<void> => {
    try {
      await Game.updateOne({id: gameId}, {
        $set: { 'gameState.state': newState }
      });
    } catch (e) {
      console.error(`Issue setting game state: ${e}`);
    }
  },

  moveGameToQuestionnaire: async function(gameId: number): Promise<PlayerQuestionnaire[]> {
    try {
      const players: IPlayer[] = await playerDb.getPlayers(gameId);
      const game: IGame | null = await this.getGameData(gameId);
      if (!game) {
        return [];
      }

      const questionnaires: PlayerQuestionnaire[] = await utilDb.createQuestionnairesForPlayers(players, game.customMode);
      await this.setGameState(gameId, GameStates.Questionnaire);

      await Game.updateOne({id: gameId}, {
        $set: { 'playerQuestionnaires': questionnaires }
      });

      return questionnaires;
    } catch (e) {
      console.error(`Issue moving game to questionnaire: ${e}`);
      return [];
    }
  },

  getPlayerQuestionnaires: async function(gameId: number): Promise<PlayerQuestionnaire[]> {
    try {
      const game: IGame | null = await this.getGameData(gameId);
      if (!game) {
        return [];
      }

      return game.playerQuestionnaires;
    } catch (e) {
      console.error(`Issue retrieving player questionnaires: ${e}`);
      return [];
    }
  },

  buildQuiz: async (game: IGame): Promise<IQuizQuestion[]> => {
    const quizQuestions: IQuizQuestion[] = await utilDb.createQuiz(game.playerQuestionnaires, game.customMode);
    await Game.updateOne({ id: game.id }, {
      $set: { 'quizQuestions': quizQuestions }
    });

    return quizQuestions;
  },

  questionsRemaining: function(game: IGame): boolean {
    const currentQuestionIndex = game.currentQuestionIndex;
    const nextQuestionIndex = currentQuestionIndex + 1;

    return nextQuestionIndex < game.quizQuestions.length;
  },

  nextQuestion: async function(gameId: number): Promise<boolean> {
    const currentGame: IGame | null = await this.getGameData(gameId);
    if (currentGame === null) {
      return false;
    }

    if (this.questionsRemaining(currentGame)) {
      await Game.updateOne({ id: gameId }, {
        $set: { 'currentQuestionIndex': currentGame.currentQuestionIndex + 1 }
      });

      return true;
    }

    return false;
  },

  deleteAllGames: async (): Promise<any> => {
    try {
      await Game.deleteMany({});
      await PreGameSettings.deleteMany({});
    } catch (e) {
      console.error(`Issue deleting all games: ${e}`);
    }
  },

  startDbFresh: async () => {
    try {
      await Game.deleteMany({});
      await Player.deleteMany({});
    } catch (e) {
      console.error(`Issue deleting all game data: ${e}`);
    }
  },

  deleteOneSettings: async (preSettingsId): Promise<any> => {
    try {
      await PreGameSettings.deleteOne({id: preSettingsId});
    } catch (e) {
      console.error(`Issue deleting all games: ${e}`);
    }
  },

  deleteGame: async(gameId: number): Promise<any> => {
    try {
      await Game.deleteOne({id: gameId});
    } catch(e) {
      console.error(`Issue deleting game: ${e}`);
    }
  },

  updateSettings: async(gameId: number, settingsData: any): Promise<any> => {
    try {

      const timePerQuestion = settingsData.timePerQuestion;
      const numQuestionnaireQuestions = settingsData.numQuestionnaireQuestions;
      const numQuizQuestions = settingsData.numQuizQuestions;
      const handsFreeMode = settingsData.handsFreeMode;
      const timePerAnswer = settingsData.timePerAnswer;
      const timePerLeaderboard = settingsData.timePerLeaderboard;
      const prioritizeCustomQs = settingsData.prioritizeCustomQs;
      const customQuestions = settingsData.addedQuestions;
      customQuestions.forEach(question => {
        const somethingEmpty = question.text === "" || question.quizText === "" || question.fakeAnswers[0] === "" || question.fakeAnswers[1] === "" || question.fakeAnswers[2] === "" || question.fakeAnswers[3] === "";
        if (somethingEmpty) {
          customQuestions.splice(customQuestions.indexOf(question), 1);
        }
      });

      await Game.updateOne({id: gameId}, {
        $set: {
          'settings.timePerQuestion': timePerQuestion,
          'settings.numQuestionnaireQuestions': numQuestionnaireQuestions,
          'settings.numQuizQuestions': numQuizQuestions,
          'settings.handsFreeMode': handsFreeMode,
          'settings.timePerAnswer': timePerAnswer,
          'settings.timePerLeaderboard': timePerLeaderboard,
          'settings.prioritizeCustomQs': prioritizeCustomQs,
          'settings.customQuestions': customQuestions
        }});

    } catch (e) {
      console.error(`Issue updating settings: ${e}`);
    }
  },

  hostOpenPreSettings: async function(socketId: string): Promise<string> {
    try {
      var newId = `preSettings_${uuid.v4()}`;
      const newPreSettingsObject: IPreGameSettings = {
        id: newId,
        hostSocketId: socketId,
        settingsState: true,
        settings: {
          timePerQuestion: 15,
          numQuestionnaireQuestions: 5,
          numQuizQuestions: 5,
          handsFreeMode: false,
          timePerAnswer: 10,
          timePerLeaderboard: 5,
          prioritizeCustomQs: true,
          customQuestions: []
        }
      };

      const newPreSettings = new PreGameSettings(newPreSettingsObject);
      await newPreSettings.save();

      return newId;
    } catch (e) {
      console.error(`Issue creating new game: ${e}`);
      return '-1';
    }
  },

  hostClosePreSettings: async function(preSettingsId: string, settingsData: any): Promise<any> {
    try {
      const timePerQuestion = settingsData.timePerQuestion;
      const numQuestionnaireQuestions = settingsData.numQuestionnaireQuestions;
      const numQuizQuestions = settingsData.numQuizQuestions;
      const handsFreeMode = settingsData.handsFreeMode;
      const timePerAnswer = settingsData.timePerAnswer;
      const timePerLeaderboard = settingsData.timePerLeaderboard;
      const prioritizeCustomQs = settingsData.prioritizeCustomQs;
      const customQuestions = settingsData.addedQuestions;
      customQuestions.forEach(question => {
        const somethingEmpty = question.text === "" || question.quizText === "" || question.fakeAnswers[0] === "" || question.fakeAnswers[1] === "" || question.fakeAnswers[2] === "" || question.fakeAnswers[3] === "";
        if (somethingEmpty) {
          customQuestions.splice(customQuestions.indexOf(question), 1);
        }
      });

      await PreGameSettings.updateOne({id: preSettingsId}, {
        $set: { 
          'settingsState': false,
          'settings.timePerQuestion': timePerQuestion,
          'settings.numQuestionnaireQuestions': numQuestionnaireQuestions,
          'settings.numQuizQuestions': numQuizQuestions,
          'settings.handsFreeMode': handsFreeMode,
          'settings.timePerAnswer': timePerAnswer,
          'settings.timePerLeaderboard': timePerLeaderboard,
          'settings.prioritizeCustomQs': prioritizeCustomQs,
          'settings.customQuestions': customQuestions
        }
      });

    } catch (e) {
      console.error(`Issue updating pre-settings: ${e}`);
    }
  },

  setSettingsState: async (preSettingsId: string, newState: boolean): Promise<void> => {
    try {
      await PreGameSettings.updateOne({id: preSettingsId}, {
        $set: { 'settingsState': newState }
      });
    } catch (e) {
      console.error(`Issue setting settings state: ${e}`);
    }
  },

  addTiebreakerQuestion: async (gameId: number): Promise<void> => {
    const randomFriendsQuestion = friendsQuestions[Math.floor(Math.random()*friendsQuestions.length)];

    try {
      await Game.updateOne({ id: gameId }, {
        $push: { quizQuestions:  randomFriendsQuestion }
      });
    } catch (e) {
      console.error(`Issue adding tiebreaker question: ${e}`);
    }
  }
}
