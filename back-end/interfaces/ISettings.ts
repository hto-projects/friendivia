import IQuestionnaireQuestion from "./IQuestionnaireQuestion"
  
  export default interface ISettings {
      timePerQuestion: number
      customQuestions: IQuestionnaireQuestion[];
  }
