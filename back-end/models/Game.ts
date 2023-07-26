import { Schema, model } from 'mongoose';
import IGame from '../interfaces/IGame';

const gameSchema = new Schema<IGame>({
  id: { type: Number, required: true },
  gameState: { type: Object, required: true },
  hostSocketId: { type: String, required: true },
  questionnaireQuestions: [{type: Object}],
  quizQuestions: [{type: Object }],
  wyrQuizQuestions: [{type: Object }],
  currentWyrQuestionIndex: { type: Number },
  currentQuestionIndex: { type: Number, required: true },
	settings: { type: Object, required: true}
});

const Game = model<IGame>('Game', gameSchema);
export default Game;
