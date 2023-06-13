enum PlayerStates {
  Init = 'init',
  JoinedWaiting = 'joined-waiting',
  FillingQuestionnaire = 'filling-questionnaire',
  DoneWithQuestionnaireWaiting = 'submitted-questionnaire-waiting'
}

interface IPlayerState {
	state: PlayerStates,
  message: string
}

export { PlayerStates, IPlayerState };
