enum PlayerStates {
  Init = 'init',
  JoinedWaiting = 'joined-waiting',
  FillingQuestionnaire = 'filling-questionnaire',
  DoneWithQuestionnaireWaiting = 'done-with-questionnaire-waiting'
}

interface IPlayerState {
	state: PlayerStates,
  message: string
}

export { PlayerStates, IPlayerState };
