enum GameStates {
  Init = 'init',
  Lobby = 'lobby',
  Questionnaire = 'questionnaire',
  Inactive = 'inactive'
}

interface IGameState {
	state: GameStates,
  message: string
}

export { GameStates, IGameState };
