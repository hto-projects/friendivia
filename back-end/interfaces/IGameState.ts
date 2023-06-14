enum GameStates {
  Init = 'init',
  Lobby = 'lobby',
  Questionnaire = 'questionnaire',
  PreQuiz = 'pre-quiz',
  Inactive = 'inactive',
  ShowingQuestion = 'showing-question',
  ShowingAnswer = 'showing-answer'
}

interface IGameState {
	state: GameStates,
  message: string
}

export { GameStates, IGameState };
