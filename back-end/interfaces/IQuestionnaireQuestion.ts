export interface IQuestionnaireQuestion {
  id: string;
  text: string;
  quizText: string;
  tags: string[];
  fakeAnswers: string[];
}

export type PlayerQuestionnaireQuestion = {
  questionId: string;
  subjectQuestion: boolean;
  answer: string;
}

export type PlayerQuestionnaire = {
  playerId: string;
  questions: PlayerQuestionnaireQuestion[];
}
