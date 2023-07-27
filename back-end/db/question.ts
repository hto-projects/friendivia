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
    getRandomQuestions: async (numQuestions: number, customQuestions: IQuestionnaireQuestion[], prioritizeCustomQs: boolean): Promise<any> => {
        try {
            var questions;

            if (prioritizeCustomQs === true) {
                const length = numQuestions - customQuestions.length;
                if (customQuestions.length >= numQuestions){
                    questions = await question.getRandomCustomQuestions(numQuestions, customQuestions);
                } else if (customQuestions.length != 0) {
                    questions = await question.getRandomCustomQuestions(customQuestions.length, customQuestions);
                    const additionalQuestions = await Question.aggregate([{ $sample: { size: length } }]);
                    additionalQuestions.forEach(question => {
                        questions.push(question);
                    });
                } else {
                    questions = await Question.aggregate([{ $sample: { size: numQuestions } }]);
                }
            } else {
                var allSize;
                if (Question.count() instanceof Number) {
                    allSize = Question.count()
                } else {
                    allSize = 24;
                }
                var allQuestions = await Question.aggregate([{ $sample: { size: allSize } }]);
                customQuestions.forEach(question => {
                    allQuestions.push(question);
                });
                questions = await question.getRandomCustomQuestions(numQuestions, allQuestions);
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
    addBaseQuestions: async (): Promise<any> => {      
            baseQuestions.forEach(async (thisQuestion) => {
                var formattedQuestion: IQuestionnaireQuestion = {
                    text: thisQuestion.text,
                    quizText: thisQuestion.quizText,
                    fakeAnswers: thisQuestion.fakeAnswers
                  }
                question.addQuestion(formattedQuestion);
            });
    },
    deleteAllQuestions: async (): Promise<any> => {
        try {
          await Question.deleteMany({});
        } catch (e) {
          console.error(`Issue deleting all games: ${e}`);
        }
      }
};




