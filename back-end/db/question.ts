import Question from "../models/Question.ts";
import IQuestionnaireQuestion from "../interfaces/IQuestionnaireQuestion";
import baseQuestions from "../db/basequestions.ts";
import question from "../db/question.ts";

export default {
    getQuestions: async (): Promise<any> => {
        try {
            const questions = await Question.find();
            return questions;
        } catch (e) {
            console.error(`Issue getting questions: ${e}`);
            return [];
        }
    },
    addQuestion: async (question: IQuestionnaireQuestion): Promise<any> => {
        try {
            const newQuestion = new Question(question);
            const questionExists = await Question.exists({ text: question.text }) || await Question.exists({ quizText: question.quizText });
            if (!questionExists) {
                await newQuestion.save();
                console.log(newQuestion);
                return newQuestion;}
            return null;
        } catch (e) {
            console.error(`Issue adding question: ${e}`);
            return null;
        }
    },
    getRandomQuestions: async (numQuestions: number): Promise<any> => {
        try {
            const questions = await Question.aggregate([{ $sample: { size: numQuestions } }]);
            return questions;
        } catch (e) {
            console.error(`Issue getting random questions: ${e}`);
            return [];
        }
    },
    addBaseQuestions: async (): Promise<any> => {      
            baseQuestions.forEach(async (thisQuestion) => {
                var formattedQuestion: IQuestionnaireQuestion = {
                    text: thisQuestion.text,
                    quizText: thisQuestion.quizText,
                    fakeAnswers: thisQuestion.fakeAnswers
                  }
                question.addQuestion(formattedQuestion);
            });
    }

};




