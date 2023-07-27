import IGame from '../interfaces/IGame.ts';
import IPreGameSettings from '../interfaces/IPreGameSettings.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import Game from '../models/Game.ts';
import PreGameSettings from '../models/PreGameSettings.ts';
import utilDb from '../db/utils.ts';
import IQuizQuestion from '../interfaces/IQuizQuestion.ts';
import playerDb from '../db/player.ts';
import * as uuid from 'uuid';
import question from '../db/question.ts';

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

  hostOpenGame: async function(socketId: string, preSettingsId: string): Promise<number> {
    try {
      const settingsData = await this.getPreSettingsData(preSettingsId);
      const timePerQuestion = settingsData?.settings.timePerQuestion || 15;
      const numQuestionnaireQuestions = settingsData?.settings.numQuestionnaireQuestions || 5;
      const numQuizQuestions = settingsData?.settings.numQuizQuestions || 5;
      const customQuestions = settingsData?.settings.customQuestions || [];
      this.deleteOneSettings(preSettingsId);

      var newId = -1;
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
        questionnaireQuestions: [],
        quizQuestions: [],
        wyrQuizQuestions: [],
        currentWyrQuestionIndex: -1,
        currentQuestionIndex: -1,
        settings: {
          timePerQuestion: timePerQuestion,
          numQuestionnaireQuestions: numQuestionnaireQuestions,
          numQuizQuestions: numQuizQuestions,
          customQuestions: customQuestions
        }
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

  setGameState: async (gameId: number, newState: GameStates): Promise<void> => {
    try {
      await Game.updateOne({id: gameId}, {
        $set: { 'gameState.state': newState }
      });
    } catch (e) {
      console.error(`Issue setting game state: ${e}`);
    }
  },

  moveGameToQuestionnaire: async function(gameId: number, questions?: number): Promise<any> {
    try {
      const players = await playerDb.getPlayers(gameId);
      const questionsWithOptions = await utilDb.createQuestionnaireQuestionsWithOptions(players, questions);
      const questionnaireQuestionsText = await questionsWithOptions.map(q => q.text);
      await this.setGameState(gameId, GameStates.Questionnaire); ///CHANGE
      await Game.updateOne({id: gameId}, {
        $set: { 'questionnaireQuestions': questionsWithOptions }
      });

      
      return questionnaireQuestionsText;
    } catch (e) {
      console.error(`Issue moving game to questionnaire: ${e}`);
    }
  },

  buildQuiz: async (gameId: number, questionnaireQuestions: any, numQuizQuestions: number): Promise<IQuizQuestion[]> => {
    const players = await playerDb.getPlayers(gameId);
    const quizQuestions = await utilDb.generateQuiz(players, questionnaireQuestions, numQuizQuestions);
    await Game.updateOne({ id: gameId }, {
      $set: { 'quizQuestions': quizQuestions }
    });

    return quizQuestions;
  },

  buildWyrQuiz: async (gameId: number): Promise<IQuizQuestion[]> => {
    const players = await playerDb.getPlayers(gameId);
    console.log("building quizz");
    const quizQuestions = await utilDb.generateWyrQuiz(players);
    console.log("qs" + quizQuestions);
    await Game.updateOne({id: gameId}, {
      $set: { 'wyrQuizQuestions': quizQuestions }
    });

    console.log("qs" + quizQuestions);
    return quizQuestions;
  },

  nextQuestion: async function(gameId: number, wyr?: boolean): Promise<boolean> {
    const currentGame: IGame | null = await this.getGameData(gameId);
    if (currentGame === null) {
      return false;
    }
    console.log(currentGame);
    if(wyr || currentGame.currentQuestionIndex >= currentGame.quizQuestions.length){
      const currentQuestionIndex = currentGame.currentWyrQuestionIndex;
      const nextQuestionIndex = currentQuestionIndex + 1;

      if (nextQuestionIndex === currentGame.wyrQuizQuestions.length) {
        return false;
      }

      await Game.updateOne({ id: gameId }, {
        $set: { 'currentWyrQuestionIndex': nextQuestionIndex }
      });

      console.log("New wyr index: " + nextQuestionIndex);

      return true;
    } 
    else{
      const currentQuestionIndex = currentGame.currentQuestionIndex;
      const nextQuestionIndex = currentQuestionIndex + 1;

      await Game.updateOne({ id: gameId }, {
        $set: { 'currentQuestionIndex': currentQuestionIndex + 1 }
      });

      if (nextQuestionIndex === currentGame.quizQuestions.length || currentGame.quizQuestions.length === currentQuestionIndex) {
        await Game.updateOne({ id: gameId }, {
          $set: { 'currentQuestionIndex': currentQuestionIndex + 1 }
        });
        return false;
      }

      return true;
    }
  },

  deleteAllGames: async (): Promise<any> => {
    try {
      await Game.deleteMany({});
      await PreGameSettings.deleteMany({});
    } catch (e) {
      console.error(`Issue deleting all games: ${e}`);
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
    try{
      await Game.deleteOne({id: gameId});
    }
    catch(e){
      console.error(`Issue deleting game: ${e}`);
    }},

  updateSettings: async(gameId: number, settingsData: any): Promise<any> => {
    try {

      const timePerQuestion = settingsData.timePerQuestion;
      const numQuestionnaireQuestions = settingsData.numQuestionnaireQuestions;
      const numQuizQuestions = settingsData.numQuizQuestions;
      const customQuestions = settingsData.addedQuestions;

      await Game.updateOne({id: gameId}, {
        $set: { 
          'settings.timePerQuestion': timePerQuestion,
          'settings.numQuestionnaireQuestions': numQuestionnaireQuestions,
          'settings.numQuizQuestions': numQuizQuestions,
          'settings.customQuestions': customQuestions
        }});

      customQuestions.forEach(async (thisQuestion) => {
        await question.addQuestion(thisQuestion);
      });

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
      const customQuestions = settingsData.customQuestions;

      await PreGameSettings.updateOne({id: preSettingsId}, {
        $set: { 
          'settingsState': false,
          'settings.timePerQuestion': timePerQuestion,
          'settings.numQuestionnaireQuestions': numQuestionnaireQuestions,
          'settings.numQuizQuestions': numQuizQuestions,
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
}
