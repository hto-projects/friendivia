import IPlayer from "../interfaces/IPlayer";
import IQuestionnaireQuestion from "../interfaces/IQuestionnaireQuestion";
import IQuizQuestion from "../interfaces/IQuizQuestion";

const createQuestionnaireQuestionsWithOptions = async (): Promise<IQuestionnaireQuestion[]> => {
  // dummy data for now
  return [
    {
      text: "What is your favorite movie?",
      fakeAnswers: ["RoboCop", "The Godfather", "The Deer Hunter", "How to Train Your Dragon", "Despicable Me", "Into the Spiderverse"]
    },
    {
      text: "What do you do for fun?",
      fakeAnswers: ["Nothing", "watch tv", "play music", "Skateboarding", "go to school", "eat pizza"]
    },
    {
      text: "Where were you born?",
      fakeAnswers: ["Cleveland", "Ohio", "here", "in a hospital", "on Planet Earth", "Detroit, Michigan"]
    },
    {
      text: "What is your favorite animal?",
      fakeAnswers: ["goose", "dog", "Tiger", "Grey Wolf", "lizard", "frog 🐸"]
    },
  ]
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

const generateQuiz = (players: IPlayer[], questionnaireQs: IQuestionnaireQuestion[]): IQuizQuestion[] => {
    const numQuestions = 4;
    const numberOfOptions = 4;

    const playerIds: string[] = [];
    for (let i = 0; i < numQuestions; i++) {
      playerIds.push(players[i % players.length].id);
    }

    const questionsList: IQuizQuestion[] = [];
    for (let i = 0; i < numQuestions; i++) {
      let currentPlayerId = chooseRandomFromList(playerIds);
      let currentPlayer = players.find(p => p.id === currentPlayerId);
      if (!currentPlayer) {
        continue;
      }

      const currentQuestionnaireQ: IQuestionnaireQuestion = questionnaireQs[i];
      const text: string = currentQuestionnaireQ.text;
      const correctAnswer: string = currentPlayer.questionnaireAnswers[i];

      const options: string[] = [correctAnswer];

      const fakeAnswers = currentQuestionnaireQ.fakeAnswers;
      const allPlayerAnswers = players.map(p => p.questionnaireAnswers[i]);

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
