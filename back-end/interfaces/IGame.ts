import { IGameState } from "./IGameState"

export default interface IGame {
	id: number,
	gameState: IGameState,
	hostSocketId: string,
	questionnaireQuestions: string[]
}
