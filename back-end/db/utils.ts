import IPlayer from "../interfaces/IPlayer";
import IQuestionnaireQuestion from "../interfaces/IQuestionnaireQuestion";
import IQuizQuestion from "../interfaces/IQuizQuestion";
import questionDb from "../db/question.ts";

function getNumberOfQuestions(players) {
  if(players.length <= 4)
  {
    return 4;
  }
  else return players.length;
}

type PlayerQuestionnaireQuestion = {
  questionId: string;
  subjectQuestion: boolean;
  answer?: string;
}

type PlayerQuestionnaire = {
  playerId: string;
  playerName: string;
  questions: PlayerQuestionnaireQuestion[];
}

async function createQuestionnairesForPlayers(players: IPlayer[]): Promise<PlayerQuestionnaire[]> {
  const allQuestionsForQuiz: IQuestionnaireQuestion[] = await questionDb.getRandomQuestions(getNumberOfQuestions(players), [], false);
  const playerQuestionnaires: PlayerQuestionnaire[] = [];

  for (let i = 0; i < players.length; i++) {
    const player: IPlayer = players[i];
    const questionIds: PlayerQuestionnaireQuestion[] = [];
    
    for (let j = 0; j < 4; j++) {
      const questionForPlayer: IQuestionnaireQuestion = allQuestionsForQuiz[(i + j) % players.length];
      questionIds.push({
        questionId: questionForPlayer.id,
        subjectQuestion: j === 0
      });
    }

    playerQuestionnaires.push({
      playerId: player.id,
      playerName: player.name,
      questions: questionIds
    });
  }

  return playerQuestionnaires;
}

async function createQuiz(playerQuestionnaires: PlayerQuestionnaire[]): Promise<IQuizQuestion[]> {
  const quizQuestions: IQuizQuestion[] = [];

  for (let i = 0; i < playerQuestionnaires.length; i++) {
    const playerQuestionnaire: PlayerQuestionnaire = playerQuestionnaires[i];
    const playerQuestion: PlayerQuestionnaireQuestion = playerQuestionnaire.questions.filter(q => q.subjectQuestion)[0];
    const questionnaireQuestion: IQuestionnaireQuestion = await questionDb.getQuestionById(playerQuestion.questionId);

    const correctAnswer: string = playerQuestion.answer || "<NO ANSWER>";
    const options: string[] = [correctAnswer];
    const otherPlayerOptions: string[] = [];

    for (let j = 0; j < playerQuestionnaires.length; j++) {
      if (j === i) continue;

      const optionPlayerQp = playerQuestionnaires[j];
      const optionPlayerQ = optionPlayerQp.questions.find(q => q.questionId === playerQuestion.questionId);
      if (optionPlayerQ && optionPlayerQ.answer) {
        otherPlayerOptions.push(optionPlayerQ.answer);
      }
    }

    selectRandom(options, otherPlayerOptions, 4);

    if (options.length < 4) {
      const fakeAnswerOptions = questionnaireQuestion.fakeAnswers;
      selectRandom(options, fakeAnswerOptions, 4);
    }

    shuffle(options);
    quizQuestions.push({
      text: questionnaireQuestion.quizText,
      playerId: playerQuestionnaire.playerId,
      optionsList: options,
      correctAnswerIndex: options.indexOf(correctAnswer),
      playerName: playerQuestionnaire.playerName
    });
  }

  shuffle(quizQuestions);
  return quizQuestions;
}

const createQuestionnaireQuestionsWithOptions = async (players, prioritizeCustomQs, number?, customQuestions?): Promise<IQuestionnaireQuestion[]> => {
  if(number){
    const questions = await questionDb.getRandomQuestions(number, customQuestions, prioritizeCustomQs);
    return questions;
  }
  const questions = await questionDb.getRandomQuestions(getNumberOfQuestions(players), customQuestions, prioritizeCustomQs);
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
      if (!newList.some(s => s.toLowerCase() === newValue.toLowerCase())) {
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

export default { createQuestionnaireQuestionsWithOptions, generateQuiz };
