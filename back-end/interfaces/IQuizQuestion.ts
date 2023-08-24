export default interface IQuizQuestion {
	text: string,
	playerId: string,
	playerName: string,
	optionsList: string[],
	correctAnswerIndex: number,
}
