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
  Settings = 'settings',
  Tiebreaker = 'tiebreaker',
  PreWyr = 'pre-wyr',
  WyrQuestionnaire = 'wyr-questionnaire',
  PreWyrQuiz = 'pre-wyr-quiz',
  ShowingWyrQuestion = 'showing-wyr-question',
  InterLeaderboard = 'intermediary-leaderboard',
}

interface IGameState {
	state: GameStates,
  message: string
}

export { GameStates, IGameState };
