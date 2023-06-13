enum GameStates {
  Init = 'init',
  Lobby = 'lobby',
  Questionnaire = 'questionnaire',
  PreQuiz = 'pre-quiz',
  Inactive = 'inactive'
}

interface IGameState {
	state: GameStates,
  message: string
}

export { GameStates, IGameState };
