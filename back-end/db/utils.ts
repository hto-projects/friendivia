import IPlayer from "../interfaces/IPlayer";
import IQuestionnaireQuestion from "../interfaces/IQuestionnaireQuestion";
import IQuizQuestion from "../interfaces/IQuizQuestion";
import Question from "../db/question.ts";
// import IWyrQuestionnaireQuestion from "../interfaces/IWyrQuestionnaireQuestion.ts";
import IWyrQuizQuestion from "../interfaces/IWyrQuizQuestion.ts";
// import question from "../db/question.ts";
import wyrquestion from "./wyrquestion.ts";

function getNumberOfQuestions(players) {
  if(players.length <= 5)
  {
    return 5;
  }
  else return players.length;
}

const createQuestionnaireQuestionsWithOptions = async (players, number?): Promise<IQuestionnaireQuestion[]> => {
  if(number){
    const questions = await Question.getRandomQuestions(number);
    return questions;
  }
  const questions = await Question.getRandomQuestions(getNumberOfQuestions(players));
  return questions;
}

const chooseRandomFromList = (listOfSomething: any[]): any => {
    const randomIdx = Math.floor(Math.random()*listOfSomething.length);
    const removedArr = listOfSomething.splice(randomIdx, 1);
    return removedArr[0];
  }

const selectRandom = (mainList, newList, count) => {
    let mainCopy = [...mainList];

    while (newList.length < count) {
      let newValue = chooseRandomFromList(mainCopy);
      if (!newList.includes(newValue)) {
        newList.push(newValue);
      }
    }
  }

const shuffle = (array: any[]): void => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

const generateQuiz = (players: IPlayer[], questionnaireQs: IQuestionnaireQuestion[], numQuizQuestions: number): IQuizQuestion[] => {
    var numQuestions = numQuizQuestions;
    if(questionnaireQs.length === 1){
      numQuestions = 1;
    } else if(questionnaireQs.length * players.length < numQuestions){
      numQuestions = questionnaireQs.length * players.length;
    }
    const numberOfOptions = 4;

    const playerIds: string[] = [];
    for (let i = 0; i < numQuestions; i++) {
      playerIds.push(players[i % players.length].id);
    }

    const revisedQuestionList: IQuestionnaireQuestion[] = [];
    for (let i = 0; i < numQuestions; i++) {
      revisedQuestionList.push(questionnaireQs[i % questionnaireQs.length]);
    }

    const selectableQuestionList: IQuestionnaireQuestion[] = [];
    for (let i = 0; i < numQuestions; i++) {
      selectableQuestionList.push(questionnaireQs[i % questionnaireQs.length]);
    }

    const questionsList: IQuizQuestion[] = [];
    for (let i = 0; i < numQuestions; i++) {
      let currentPlayerId = chooseRandomFromList(playerIds);
      let currentPlayer = players.find(p => p.id === currentPlayerId);
      if (!currentPlayer) {
        continue;
      }

      const currentQuestionnaireQ: IQuestionnaireQuestion = chooseRandomFromList(selectableQuestionList);
      const text: string = currentQuestionnaireQ.quizText;
      const Qindex: number = revisedQuestionList.indexOf(currentQuestionnaireQ);
      const correctAnswer: string = currentPlayer.questionnaireAnswers[Qindex % questionnaireQs.length];

      const options: string[] = [correctAnswer];
 
      const fakeAnswers = currentQuestionnaireQ.fakeAnswers;
      const allPlayerAnswers = players.map(p => p.questionnaireAnswers[Qindex % questionnaireQs.length]);

      selectRandom([...fakeAnswers, ...allPlayerAnswers], options, numberOfOptions);
      shuffle(options);

      const correctAnswerIndex: number = options.indexOf(correctAnswer);
      
      const currentQuestion: IQuizQuestion = {
        correctAnswerIndex: correctAnswerIndex,
        text: text,
        playerId: currentPlayerId,
        playerName: currentPlayer.name,
        optionsList: options
      }
      
      questionsList.push(currentQuestion);
    }

    shuffle(questionsList);
    return questionsList;
  }

  const generateWyrQuiz = async (players: IPlayer[]): Promise<IWyrQuizQuestion[]> => {
    var questionsList: IWyrQuizQuestion[] = [];
  
    for (let i = 0; i < players.length; i++) {
      if (players[i].wyrText && players[i].wyrAnswer) {
        console.log("getting q");
        var question = await wyrquestion.getQuestion(players[i].wyrText || "");
        console.log(question);
        console.log("got q, getting A");
        var answerA = await question[0].answerA;
        console.log("got A, getting B");
        var answerB = await question[0].answerB;
        console.log("got B");
        console.log(question, answerA, answerB);
        var qText = players[i].wyrText?.replace("you", players[i].name)
        var currentQuestion: IWyrQuizQuestion = {
          text: qText || "",
          correctAnswer: players[i].wyrAnswer || "",
          answerA: answerA,
          answerB: answerB,
          playerId: players[i].id,
          playerName: players[i].name
        }
        questionsList.push(currentQuestion);
      }
    }
    console.log(questionsList);
    shuffle(questionsList);
    console.log(questionsList);
    return questionsList;
  }
  

export default { createQuestionnaireQuestionsWithOptions, generateQuiz, generateWyrQuiz };
