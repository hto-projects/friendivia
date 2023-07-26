import { IPlayerState } from "./IPlayerState"

export default interface IPlayer {
	name: string,
	id: string,
	questionnaireAnswers: string[],
	quizGuesses: number[],
  score: number,
	gameId: number,
	playerState: IPlayerState,
	playerSocketId: string,
	wyrText?: string,
	wyrAnswer?: string,
}
