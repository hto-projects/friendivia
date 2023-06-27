import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import Game from '../models/Game.ts'
import utilDb from '../db/utils.ts';
import IQuizQuestion from '../interfaces/IQuizQuestion.ts';
import playerDb from '../db/player.ts';

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

  hostOpenGame: async function(socketId: string): Promise<number> {
    try {
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
        currentQuestionIndex: -1
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

  moveGameToQuestionnaire: async function(gameId: number): Promise<any> {
    try {
      const players = await playerDb.getPlayers(gameId);
      const questionsWithOptions = await utilDb.createQuestionnaireQuestionsWithOptions(players);
      const questionnaireQuestionsText = await questionsWithOptions.map(q => q.text);
      await this.setGameState(gameId, GameStates.Questionnaire);
      await Game.updateOne({id: gameId}, {
        $set: { 'questionnaireQuestions': questionsWithOptions }
      });

      return questionnaireQuestionsText;
    } catch (e) {
      console.error(`Issue moving game to questionnaire: ${e}`);
    }
  },

  buildQuiz: async (gameId: number): Promise<IQuizQuestion[]> => {
    const players = await playerDb.getPlayers(gameId);
    const questionnaireQuestions = await utilDb.createQuestionnaireQuestionsWithOptions(players);
    const quizQuestions = await utilDb.generateQuiz(players, questionnaireQuestions);
    await Game.updateOne({ id: gameId }, {
      $set: { 'quizQuestions': quizQuestions }
    });

    return quizQuestions;
  },

  nextQuestion: async function(gameId: number): Promise<boolean> {
    const currentGame: IGame | null = await this.getGameData(gameId);
    if (currentGame === null) {
      return false;
    }

    const currentQuestionIndex = currentGame.currentQuestionIndex;
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex === currentGame.quizQuestions.length) {
      return false;
    }

    await Game.updateOne({ id: gameId }, {
      $set: { 'currentQuestionIndex': currentQuestionIndex + 1 }
    });

    return true;
  },

  deleteAllGames: async (): Promise<any> => {
    try {
      await Game.deleteMany({});
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
    }}
}
