import Question from "../models/Question.ts";
import { IQuestionnaireQuestion, PlayerQuestionnaire, PlayerQuestionnaireQuestion } from "../interfaces/IQuestionnaireQuestion";
import questionDb from "../db/question.ts";
import { shuffle } from './utils.ts';
import { ObjectId, Schema } from "mongoose";

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
    getQuestionById: async (questionId: ObjectId): Promise<IQuestionnaireQuestion | null> => {
        try {
            const question: IQuestionnaireQuestion | null = await Question.findById(questionId);
            return question;
        } catch (e) {
            console.error(`Issue getting question: ${e}`);
            return null;
        }
    },
    addQuestion: async (question: IQuestionnaireQuestion): Promise<any> => {
        try {
            const newQuestion = new Question(question);
            const questionExists = await Question.exists({ text: question.text }) || await Question.exists({ quizText: question.quizText });
            const nothingEmpty = question.text != "" && question.quizText != "" && question.fakeAnswers[0] != "" && question.fakeAnswers[1] != "" && question.fakeAnswers[2] != "" && question.fakeAnswers[3] != "";
            if (!questionExists && nothingEmpty) {
                await newQuestion.save();
                return newQuestion;}
            return null;
        } catch (e) {
            console.error(`Issue adding question: ${e}`);
            return null;
        }
    },
    getRandomCustomQuestions: async (numQuestions: number, customQuestions: IQuestionnaireQuestion[]): Promise<any> => {
        try {
            var questions: IQuestionnaireQuestion[] = [];
            while(questions.length < numQuestions) {
                const index = Math.floor(Math.random() * customQuestions.length);
                questions.push(customQuestions[index]);
                customQuestions.splice(index, 1);
            }
            return questions;
        } catch (e) {
            console.error(`Issue getting random questions: ${e}`);
            return [];
        }
    },
    getQuestionsForQuiz: async (numQuestions: number, customMode: string): Promise<Array<PlayerQuestionnaireQuestion & { _id: Schema.Types.ObjectId }>> => {
        let questions: Array<PlayerQuestionnaireQuestion & { _id: Schema.Types.ObjectId }> = [];
        if (customMode) {
            questions = await Question.find({ tags: customMode });
            if (questions.length < numQuestions) {
                questions = await Question.find();
            }
        } else {
            questions = await Question.find();
        }
        
        shuffle(questions);
        return questions.slice(0, numQuestions);
    },
    getRandomQuestions: async (numQuestions: number, customQuestions: IQuestionnaireQuestion[], prioritizeCustomQs: boolean): Promise<any> => {
        try {
            var questions;

            if (prioritizeCustomQs === true) {
                const length = numQuestions - customQuestions.length;
                if (customQuestions.length >= numQuestions){
                    questions = await questionDb.getRandomCustomQuestions(numQuestions, customQuestions);
                } else if (customQuestions.length != 0) {
                    questions = await questionDb.getRandomCustomQuestions(customQuestions.length, customQuestions);
                    const additionalQuestions = await Question.aggregate([{ $sample: { size: length } }]);
                    additionalQuestions.forEach(question => {
                        questions.push(question);
                    });
                } else {
                    questions = await Question.aggregate([{ $sample: { size: numQuestions } }]);
                }
            } else {
                const allSize = await Question.count().count();
                var allQuestions = await Question.aggregate([{ $sample: { size: allSize } }]);
                customQuestions.forEach(question => {
                    allQuestions.push(question);
                });
                questions = await questionDb.getRandomCustomQuestions(numQuestions, allQuestions);
            }
            
            for (var i = 0; i < questions.length; i++) {
                for (var j = i + 1; j < questions.length; j++) {
                    while (questions[i].text == questions[j].text) {
                        questions[i] = await Question.aggregate([{ $sample: { size: 1 } }]);
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
          await Question.deleteMany({});
        } catch (e) {
          console.error(`Issue deleting all games: ${e}`);
        }
      },
    getQuestionnaireQuestionsText: async function(questionnaire: PlayerQuestionnaire): Promise<string[]> {
        const questionnaireQuestionsText: Array<string> = [];
        for (let j = 0; j < questionnaire.questions.length; j++) {
          const pqq: PlayerQuestionnaireQuestion = questionnaire.questions[j];
          const question: IQuestionnaireQuestion | null = await questionDb.getQuestionById(pqq.questionId);
          if (!question) {
            continue;
          }

          questionnaireQuestionsText.push(question.text);
        }

        return questionnaireQuestionsText;
    }
};
