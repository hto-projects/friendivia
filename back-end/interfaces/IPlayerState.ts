enum PlayerStates {
  Init = 'init',
  JoinedWaiting = 'joined-waiting',
  FillingQuestionnaire = 'filling-questionnaire',
  DoneWithQuestionnaireWaiting = 'submitted-questionnaire-waiting',
  SeeingQuestion = 'seeing-question',
  QuestionAboutMe = 'question-about-me',
  AnsweredQuizQuestionWaiting = 'answered-quiz-question-waiting',
  SeeingAnswer = 'seeing-answer',
  PreLeaderBoard = 'pre-leader-board',
  LeaderBoard = 'leader-board'
}

interface IPlayerState {
	state: PlayerStates,
  message: string
}

export { PlayerStates, IPlayerState };
