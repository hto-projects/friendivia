import IPlayer from "../interfaces/IPlayer";
import { IQuestionnaireQuestion, PlayerQuestionnaire, PlayerQuestionnaireQuestion } from "../interfaces/IQuestionnaireQuestion";
import IQuizQuestion from "../interfaces/IQuizQuestion";
import questionDb from "../db/question.ts";
import playerDb from "../db/player.ts";
import { Schema } from "mongoose";

function getNumberOfQuestions(players) {
  return Math.max(4, players.length);
}

export async function createQuestionnairesForPlayers(players: IPlayer[], customMode: string): Promise<PlayerQuestionnaire[]> {
  const totalQuestions = getNumberOfQuestions(players);
  const allQuestionsForQuiz = await questionDb.getQuestionsForQuiz(totalQuestions, customMode);
  const playerQuestionnaires: PlayerQuestionnaire[] = [];

  for (let i = 0; i < players.length; i++) {
    const player: IPlayer = players[i];
    const questionIds: PlayerQuestionnaireQuestion[] = [];
    
    for (let j = 0; j < 4; j++) {
      const questionForPlayer: PlayerQuestionnaireQuestion & { _id: Schema.Types.ObjectId } = allQuestionsForQuiz[(i + j) % totalQuestions];
      questionIds.push({
        questionId: questionForPlayer._id,
        subjectQuestion: j === 0,
        answer: ""
      });
    }

    shuffle(questionIds);
    playerQuestionnaires.push({
      playerId: player.id,
      questions: questionIds
    });
  }

  return playerQuestionnaires;
}

export async function createQuiz(playerQuestionnaires: PlayerQuestionnaire[]): Promise<IQuizQuestion[]> {
  const quizQuestions: IQuizQuestion[] = [];

  for (let i = 0; i < playerQuestionnaires.length; i++) {
    const playerQuestionnaire: PlayerQuestionnaire = playerQuestionnaires[i];
    const player: IPlayer | null = await playerDb.getPlayer(playerQuestionnaire.playerId);
    if (!player) {
      continue;
    }

    const playerQuestion: PlayerQuestionnaireQuestion | undefined = playerQuestionnaire.questions.find(q => q.subjectQuestion);
    if (!playerQuestion) {
      continue;
    }

    const questionnaireQuestion: IQuestionnaireQuestion | null = await questionDb.getQuestionById(playerQuestion.questionId);
    if (!questionnaireQuestion) {
      continue;
    }

    const correctAnswer: string = playerQuestion.answer || "<NO ANSWER>";
    const options: string[] = [correctAnswer];
    const otherPlayerOptions: string[] = [];

    for (let j = 0; j < playerQuestionnaires.length; j++) {
      if (j === i) continue;

      const optionPlayerQp = playerQuestionnaires[j];
      const optionPlayerQ: PlayerQuestionnaireQuestion | undefined = optionPlayerQp.questions.find(q => q.questionId.toString() === playerQuestion.questionId.toString());
      if (optionPlayerQ && optionPlayerQ.answer) {
        otherPlayerOptions.push(optionPlayerQ.answer);
      }
    }

    const optionsWithOtherPlayers = selectRandom(options, otherPlayerOptions, 4);
    const optionsWithFakes = selectRandom(optionsWithOtherPlayers, questionnaireQuestion.fakeAnswers, 4);

    shuffle(optionsWithFakes);
    quizQuestions.push({
      text: questionnaireQuestion.quizText,
      playerId: playerQuestionnaire.playerId,
      playerName: player.name,
      optionsList: optionsWithFakes,
      correctAnswerIndex: optionsWithFakes.indexOf(correctAnswer),
    });
  }

  shuffle(quizQuestions);
  return quizQuestions;
}

export const createQuestionnaireQuestionsWithOptions = async (players, prioritizeCustomQs, number?, customQuestions?): Promise<IQuestionnaireQuestion[]> => {
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
  let newListCopy = [...newList];
  let mainListCopy = [...mainList];
  while (mainListCopy.length < count && newListCopy.length > 0) {
    let newValue = chooseRandomFromList(newListCopy);
    if (!mainListCopy.some(s => s.toLowerCase() === newValue.toLowerCase())) {
      mainListCopy.push(newValue);
    }
  }

  return mainListCopy;
}

export const shuffle = (array: any[]): void => {
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

export const generateQuiz = (players: IPlayer[], questionnaireQs: IQuestionnaireQuestion[], numQuizQuestions: number): IQuizQuestion[] => {
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
