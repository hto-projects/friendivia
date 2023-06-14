import * as uuid from 'uuid';
import IPlayer from '../interfaces/IPlayer.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';
import Player from '../models/Player.ts'
import IGame from '../interfaces/IGame.ts';

const getPlayers = async (gameId: number): Promise<IPlayer[]> => {
  try {
    const players = await Player.find({gameId: gameId});
    return players;
  } catch (e) {
    console.error(`Issue getting player names: ${e}`);
    return [];
  }
};

const addPlayer = async (playerName: string, gameId: number, socketId: string): Promise<string> => {
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
};

const getPlayer = async (playerId: string): Promise<any> => {
  try {
    const player = await Player.findOne({id: playerId});
    return player;
  } catch (e) {
    console.error(`Issue getting player state: ${e}`);
    return null;
  }
}

const getPlayerBySocketId = async (socketId: string): Promise<any> => {
  try {
    const player = await Player.findOne({playerSocketId: socketId});
    return player;
  } catch (e) {
    console.error(`Issue getting player state: ${e}`);
    return null;
  }
}

const updateAllPlayerStates = async (gameId: number, newState: PlayerStates, io, extraData: object): Promise<any> => {
  try {
    await Player.updateMany({gameId: gameId}, { $set: { 'playerState.state': newState } });
    const allPlayers = await Player.find({gameId: gameId});
    for (const player of allPlayers) {
      io.to(player.playerSocketId).emit('player-next', { player, extraData });
    }
  } catch (e) {
    console.error(`Issue updating all player states: ${e}`);
  }
};

const playerCompleteQuestionnaire = async (playerId: string, questionnaireAnswers: string[]): Promise<any> => {
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
};

const checkAllPlayersDoneWithQuestionnaire = async (gameId: number): Promise<boolean> => {
  try {
    const allPlayersInGame = await Player.find({gameId: gameId});
    return allPlayersInGame.every(p => p.playerState.state === PlayerStates.DoneWithQuestionnaireWaiting);
  } catch (e) {
    console.error(`Issue checking if all players are done with questionnaire: ${e}`);
    return false;
  }
};

const playerAnswerQuestion = async (playerId: string, guess: number, gameData: IGame): Promise<any> => {
  try {
    const player: IPlayer | null = await Player.findOne({id: playerId});

    if (player === null) {
      throw `Player not found: ${playerId}`;
    } else {    
      const newQuizGuesses = player.quizGuesses;
      newQuizGuesses[gameData.currentQuestionIndex] = guess;

      await Player.updateOne({
        id: playerId
      }, { 
        $set: {
          'playerState.state': PlayerStates.AnsweredQuizQuestionWaiting,
          'quizGuesses': newQuizGuesses
        }
      });
    }
  } catch (e) {
    console.error(`Issue answering question: ${e}`);
  }
};

const checkAllPlayersAnsweredQuizQuestion = async (gameId: number): Promise<boolean> => {
  try {
    const allPlayersInGame = await Player.find({gameId: gameId});
    return allPlayersInGame.every(p => p.playerState.state === PlayerStates.AnsweredQuizQuestionWaiting);
  } catch (e) {
    console.error(`Issue checking if all players have answered question: ${e}`);
    return false;
  }
};

type Guess = { name: string, guess: number}

const getPlayerGuessesForQuizQuestion = async (gameId: number, questionIndex: number): Promise<Guess[]> => {
  const playersInGame = await getPlayers(gameId);
  const playerGuesses = playersInGame.map(p => ({
    name: p.name,
    guess: p.quizGuesses[questionIndex]
  }));

  return playerGuesses;
}

const deleteAllPlayers = async (): Promise<any> => {
  try {
    await Player.deleteMany({});
  } catch (e) {
    console.error(`Issue deleting all players: ${e}`);
  }
};

export default {
  getPlayers,
  addPlayer,
  deleteAllPlayers,
  getPlayer,
  getPlayerBySocketId,
  updateAllPlayerStates,
  playerCompleteQuestionnaire,
  checkAllPlayersDoneWithQuestionnaire,
  playerAnswerQuestion,
  checkAllPlayersAnsweredQuizQuestion,
  getPlayerGuessesForQuizQuestion
};
