import { Schema, model } from 'mongoose';
import WyrQuestionnaireQuestion from '../interfaces/IWyrQuestionnaireQuestion';

const questionSchema = new Schema<WyrQuestionnaireQuestion>({
    text: { type: String, required: true },
    quizText: { type: String, required: true },
    answerA: { type: String, required: true },
    answerB: { type: String, required: true }
});

const WyrQuestion = model<WyrQuestionnaireQuestion>('WyrQuestion', questionSchema);
export default WyrQuestion;