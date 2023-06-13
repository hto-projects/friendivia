enum PlayerStates {
  Init = 'init',
  JoinedWaiting = 'joined-waiting',
  FillingQuestionnaire = 'filling-questionnaire',
  DoneWithQuestionnaireWaiting = 'submitted-questionnaire-waiting',
  SeeingQuestion = 'seeing-question',
  WaitingForAnswer = 'waiting-for-answer',
  SeeingAnswer = 'seeing-answer'
}

interface IPlayerState {
	state: PlayerStates,
  message: string
}

export { PlayerStates, IPlayerState };
