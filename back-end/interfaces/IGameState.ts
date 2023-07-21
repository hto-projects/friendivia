enum GameStates {
  Init = 'init',
  Lobby = 'lobby',
  Questionnaire = 'questionnaire',
  PreQuiz = 'pre-quiz',
  ShowingQuestion = 'showing-question',
  PreAnswer = 'pre-answer',
  ShowingAnswer = 'showing-answer',
  PreLeaderBoard = 'pre-leader-board',
  LeaderBoard = 'leader-board',
  Inactive = 'inactive',
  Tiebreaker = 'tiebreaker',
  InterLeaderboard = 'intermediary-leaderboard',
}

interface IGameState {
	state: GameStates,
  message: string
}

export { GameStates, IGameState };
