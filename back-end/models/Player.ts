import { Schema, model } from 'mongoose';
import IPlayer from '../interfaces/IPlayer';

const playerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  id: { type: String, required: true },
	questionnaireAnswers: [{ type: String }],
	quizGuesses: [{ type: Number }],
  score: { type: Number, required: true },
  gameId: { type: Number, required: true },
  playerState: { type: Object, required: true },
  playerSocketId: { type: String, required: true },
  wyrText: { type: String },
  wyrAnswer: { type: String },
});

const Player = model<IPlayer>('Player', playerSchema);
export default Player;
