import { Schema, model } from 'mongoose';
import IGame from '../interfaces/IGame';

const gameSchema = new Schema<IGame>({
  id: { type: Number, required: true },
  gameState: { type: Object, required: true },
  hostSocketId: { type: String, required: true }
});

const Game = model<IGame>('Game', gameSchema);
export default Game;
