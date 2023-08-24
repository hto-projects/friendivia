import { Schema, model } from 'mongoose';
import { IQuestionnaireQuestion } from '../interfaces/IQuestionnaireQuestion';

const questionSchema = new Schema<IQuestionnaireQuestion>({
    id: { type: String, required: true },
    text: { type: String, required: true },
    quizText: { type: String, required: true },
    fakeAnswers: [{ type: String }]
});

const Question = model<IQuestionnaireQuestion>('Question', questionSchema);
export default Question;