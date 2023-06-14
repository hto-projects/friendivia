import { Socket } from 'socket.io';
import playerDb from '../db/player.ts';
import hostDb from '../db/host.ts';
import IPlayer from '../interfaces/IPlayer.ts';
import IGame from '../interfaces/IGame.ts';
import { GameStates } from '../interfaces/IGameState.ts';
import { PlayerStates } from '../interfaces/IPlayerState.ts';

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
        const currentGameData = await hostDb.getGameData(gameId);
        io.to(currentGameData?.hostSocketId).emit('players-updated', {
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
      if (gameData === null) {
        return;
      }

      const currentQuizQuestionIndex = gameData.currentQuestionIndex;
      const extraData = {
        questionnaireQuestionsText: gameData?.questionnaireQuestions.map(q => q.text),
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

  const hostGoNext = async (gameId: number): Promise<void> => {
    const currentGameData: IGame | null = await hostDb.getGameData(gameId);
    io.to(currentGameData?.hostSocketId).emit('host-next', currentGameData);
  }

  const allPlayersGoNext = async (gameId: number): Promise<void> => {
    const currentGameData: IGame | null = await hostDb.getGameData(gameId);

    const currentQuestionIndex = currentGameData?.currentQuestionIndex || 0;
    const quizQuestionOptionsText: string[] = currentGameData?.quizQuestions[currentQuestionIndex].optionsList || [];

    await playerDb.updateAllPlayerStates(gameId, PlayerStates.SeeingQuestion, io, { quizQuestionOptionsText });
  }

  const hostStartQuiz = async (gameId: number): Promise<void> => {
    await hostDb.setGameState(gameId, GameStates.PreQuiz);
    await hostDb.buildQuiz(gameId);
    await hostGoNext(gameId);
    setTimeout(async () => {
      await hostDb.setGameState(gameId, GameStates.ShowingQuestion);
      await hostDb.nextQuestion(gameId);
      await hostGoNext(gameId);
      await allPlayersGoNext(gameId);
    }, 5000);
  }

  const hostShowAnswer = async (gameId: number): Promise<void> => {
    await hostDb.setGameState(gameId, GameStates.ShowingAnswer);
    const gameData = await hostDb.getGameData(gameId);
    if (gameData === null) {
      return;
    }

    const guesses = await playerDb.getPlayerGuessesForQuizQuestion(gameId, gameData.currentQuestionIndex);
    
    io.to(gameData?.hostSocketId).emit('host-next', { ...gameData, quizQuestionGuesses: guesses});
  }

  const onPlayerSubmitQuestionnaire = async (answers: string []) => {
    try {
      const player: IPlayer = await playerDb.getPlayerBySocketId(socket.id);
      const gameId = player.gameId;
      await playerDb.playerCompleteQuestionnaire(player.id, answers);
      socket.emit('player-submit-questionnaire-success');

      const allPlayersDone = await playerDb.checkAllPlayersDoneWithQuestionnaire(gameId);
      if (allPlayersDone) {
        await hostStartQuiz(gameId);
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
        await hostShowAnswer(gameId);
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
