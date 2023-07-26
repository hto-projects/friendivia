import IQuestionnaireQuestion from "./IQuestionnaireQuestion"
  
  export default interface ISettings {
      timePerQuestion: number,
      numQuestionnaireQuestions: number,
      numQuizQuestions: number,
      prioritizeCustomQs: boolean,
      customQuestions: IQuestionnaireQuestion[]
  }
