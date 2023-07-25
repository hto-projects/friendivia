import WyrQuestion from "../models/WyrQuestion.ts";
import IWyrQuestionnaireQuestion from "../interfaces/IWyrQuestionnaireQuestion";

export default {
    getQuestions: async (): Promise<any> => {
        try {
            const questions = await WyrQuestion.find();
            return questions;
        } catch (e) {
            console.error(`Issue getting questions: ${e}`);
            return [];
        }
    },
    addQuestion: async (question: IWyrQuestionnaireQuestion): Promise<any> => {
        try {
            const newQuestion = new WyrQuestion(question);
            const questionExists = await WyrQuestion.exists({ text: question.text }) || await WyrQuestion.exists({ quizText: question.quizText });
            const nothingEmpty = question.text != "" || question.quizText != "" || question.answerA != "" || question.answerB != "" ;
            if (!questionExists && nothingEmpty) {
                await newQuestion.save();
                return newQuestion;}
            return null;
        } catch (e) {
            console.error(`Issue adding question: ${e}`);
            return null;
        }
    },
    getRandomQuestions: async (numQuestions: number): Promise<any> => {
        try {
            var questions = await WyrQuestion.aggregate([{ $sample: { size: numQuestions } }]);
            for (var i = 0; i < questions.length; i++) {
                for (var j = i + 1; j < questions.length; j++) {
                    while (questions[i].text == questions[j].text) {
                        questions[i] = await WyrQuestion.aggregate([{ $sample: { size: 1 } }]);
                    }
                }
            }
            return questions;
        } catch (e) {
            console.error(`Issue getting random questions: ${e}`);
            return [];
        }
    },
    deleteAllQuestions: async (): Promise<any> => {
        try {
          await WyrQuestion.deleteMany({});
        } catch (e) {
          console.error(`Issue deleting all games: ${e}`);
        }
      }
};




