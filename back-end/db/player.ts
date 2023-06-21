import * as uuid from 'uuid';
import IPlayer from '../interfaces/IPlayer.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import Player from '../models/Player.ts'
import IGame from '../interfaces/IGame.ts';

type Guess = { name: string, guess: number };
type Score = { name: string, score: number };

export default {
  getPlayers: async (gameId: number): Promise<IPlayer[]> => {
    try {
      const players = await Player.find({gameId: gameId});
      return players;
    } catch (e) {
      console.error(`Issue getting player names: ${e}`);
      return [];
    }
  },

  addPlayer: async (playerName: string, gameId: number, socketId: string): Promise<string> => {
    try {
      const playerId = `player_${uuid.v4()}`;
      const newPlayerObject: IPlayer = {
        name: playerName,
        id: playerId,
        questionnaireAnswers: [],
        quizGuesses: [],
        score: 0,
        gameId: gameId,
        playerState: {
          state: PlayerStates.JoinedWaiting,
          message: ""
        },
        playerSocketId: socketId
      }
      
      const newPlayer = new Player(newPlayerObject);
      await newPlayer.save();
      return playerId;
    } catch (e) {
      console.error(`Issue adding player: ${e}`);
      return '';
    }
  },

  getPlayer: async (playerId: string): Promise<any> => {
    try {
      const player = await Player.findOne({id: playerId});
      return player;
    } catch (e) {
      console.error(`Issue getting player state: ${e}`);
      return null;
    }
  },

  getPlayerBySocketId: async (socketId: string): Promise<any> => {
    try {
      const player = await Player.findOne({playerSocketId: socketId});
      return player;
    } catch (e) {
      console.error(`Issue getting player state: ${e}`);
      return null;
    }
  },

  updateAllPlayerStates: async (gameId: number, newState: PlayerStates, io, extraData: object): Promise<any> => {
    try {
      await Player.updateMany({gameId: gameId}, { $set: { 'playerState.state': newState } });
      const allPlayers = await Player.find({gameId: gameId});
      for (const player of allPlayers) {
        io.to(player.playerSocketId).emit('player-next', { player, extraData });
      }
    } catch (e) {
      console.error(`Issue updating all player states: ${e}`);
    }
  },

  playerCompleteQuestionnaire: async (playerId: string, questionnaireAnswers: string[]): Promise<any> => {
    try {
      await Player.updateOne({
        id: playerId
      }, { 
        $set: { 
          'questionnaireAnswers': questionnaireAnswers,
          'playerState.state': 'submitted-questionnaire-waiting' 
        }
      });
    } catch (e) {
      console.error(`Issue adding player questionnaire answers: ${e}`);
    }
  },

  checkAllPlayersDoneWithQuestionnaire: async (gameId: number): Promise<boolean> => {
    try {
      const allPlayersInGame = await Player.find({gameId: gameId});
      return allPlayersInGame.every(p => p.playerState.state === PlayerStates.DoneWithQuestionnaireWaiting);
    } catch (e) {
      console.error(`Issue checking if all players are done with questionnaire: ${e}`);
      return false;
    }
  },

  playerAnswerQuestion: async (playerId: string, guess: number, gameData: IGame): Promise<any> => {
    try {
      const player: IPlayer | null = await Player.findOne({id: playerId});
      /*
      //Log player data
      console.log(playerId + " | " + guess);*/
      //console.log(gameData);
      
      if (player === null) {
        throw `Player not found: ${playerId}`;
      } else {    
        const newQuizGuesses = player.quizGuesses;
        newQuizGuesses[gameData.currentQuestionIndex] = guess;
        //                                                                                                                                                                                                                                      halo
        console.log(player.name + "'s score before guess: " + player.score);
        await Player.updateOne({
          id: playerId
        }, { 
          $set: {
            'playerState.state': PlayerStates.AnsweredQuizQuestionWaiting,
            'quizGuesses': newQuizGuesses,
            'score' : player.score + (guess == gameData.quizQuestions[gameData.currentQuestionIndex].correctAnswerIndex ? 200 : 0)
          }
        });
        console.log(player.name + "'s score after guess: " + (player.score + (guess == gameData.quizQuestions[gameData.currentQuestionIndex].correctAnswerIndex ? 200 : 0)));
      }
    } catch (e) {
      console.error(`Issue answering question: ${e}`);
    }
  },

  checkAllPlayersAnsweredQuizQuestion: async (gameId: number): Promise<boolean> => {
    try {
      const allPlayersInGame = await Player.find({gameId: gameId});
      return allPlayersInGame.every(p => p.playerState.state === PlayerStates.AnsweredQuizQuestionWaiting || p.playerState.state === PlayerStates.QuestionAboutMe);
    } catch (e) {
      console.error(`Issue checking if all players have answered question: ${e}`);
      return false;
    }
  },

  getPlayerGuessesForQuizQuestion: async function(gameId: number, questionIndex: number): Promise<Guess[]> {
    const playersInGame = await this.getPlayers(gameId);
    const playerGuesses = playersInGame.map(p => ({
      name: p.name,
      guess: p.quizGuesses[questionIndex]
    }));

    return playerGuesses;
  },

  getPlayerScores: async function(gameId: number): Promise<Score[]> {
    const playersInGame = await this.getPlayers(gameId);
    const playerScores = playersInGame.map(p => ({
      name: p.name,
      score: p.score
    }));

    return playerScores;
  },

  deleteAllPlayers: async (): Promise<any> => {
    try {
      await Player.deleteMany({});
    } catch (e) {
      console.error(`Issue deleting all players: ${e}`);
    }
  }
}
