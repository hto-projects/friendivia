enum GameStates {
  Init = 'init',
  Lobby = 'lobby',
  Inactive = 'inactive'
}

interface IGameState {
	state: GameStates,
  message: string
}

export { GameStates, IGameState };
