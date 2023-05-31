enum PlayerStates {
  Init = 'init',
  JoinedWaiting = 'joined-waiting'
}

interface IPlayerState {
	state: PlayerStates,
  message: string
}

export { PlayerStates, IPlayerState };
