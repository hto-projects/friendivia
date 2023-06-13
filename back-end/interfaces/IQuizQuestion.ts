export default interface IQuizQuestion {
	text: string,
	playerId: string,
	optionsList: string[],
	correctAnswerIndex: number,
  playerName: string
}
