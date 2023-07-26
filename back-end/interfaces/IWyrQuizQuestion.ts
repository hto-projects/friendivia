export default interface IQuizQuestion {
	text: string,
	playerId: string,
	answerA: string,
    answerB: string,
	correctAnswer: string, // 'A' or 'B'
    playerName: string
}
