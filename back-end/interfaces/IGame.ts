import { IGameState } from "./IGameState"
import IQuestionnaireQuestion from "./IQuestionnaireQuestion"
import IQuizQuestion from "./IQuizQuestion"

export default interface IGame {
	id: number,
	gameState: IGameState,
	hostSocketId: string,
	questionnaireQuestions: IQuestionnaireQuestion[],
	quizQuestions: IQuizQuestion[],
	currentQuestionIndex: number
}
