import { IGameState } from "./IGameState"
import IQuestionnaireQuestion from "./IQuestionnaireQuestion"
import IQuizQuestion from "./IQuizQuestion"
import ISettings from "./ISettings"

export default interface IGame {
	id: number,
	gameState: IGameState,
	hostSocketId: string,
	questionnaireQuestions: IQuestionnaireQuestion[],
	quizQuestions: IQuizQuestion[],
	wyrQuizQuestions: IQuizQuestion[],
	currentQuestionIndex: number,
	currentWyrQuestionIndex: number,
	settings: ISettings
}
