import IQuestionnaireQuestion from "./IQuestionnaireQuestion"
  
  export default interface ISettings {
      timePerQuestion: number,
      numQuizQuestions: number,
      customQuestions: IQuestionnaireQuestion[]
  }
