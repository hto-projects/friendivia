import IPlayer from "../interfaces/IPlayer";

interface IQuizQuestion {
	text: string,
	playerId: string,
	optionsList: string[],
	correctAnswer: number
}

const createQuestionnaireQuestions = async (): Promise<string[]> => {
  return [
    "What is your favorite movie?",
    "What do you do for fun?",
    "Where were you born?"
  ];
};

const chooseRandomFromList = (listOfSomething: any[]): any => {
    const randomIdx = Math.floor(Math.random()*listOfSomething.length);
    const removedArr = listOfSomething.splice(randomIdx, 1);
    return removedArr[0];
  }

const selectRandom = (mainList, newList, count) =>{
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

const getNumQuestions = (numPlayers) => {
  return numPlayers;
}

const generateQuiz = (players: IPlayer[], questionnaireQs: string[]): IQuizQuestion[] => {
    const numQuestions = getNumQuestions(players.length);
    const numberOfOptions = 4;

    for (let i = 0; i < numQuestions; i++) {

    }

    const allPlayerIds: string[] = players.map(p => p.id);

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

      const text: string = questionnaireQs[i];
      const playerId: string = currentPlayer.id;

      const randomPlayerIds: string[] = [];
      randomPlayerIds.push(currentPlayerId);
      selectRandom(allPlayerIds, randomPlayerIds, numberOfOptions);
      shuffle(randomPlayerIds);
      const correctAnswer: number = randomPlayerIds.indexOf(currentPlayerId);

      let optionsList: string[] = [];
      for (let j = 0; j < randomPlayerIds.length; j++) {
        let optionPlayer: IPlayer | undefined = players.find(p => p.id === randomPlayerIds[j]);
        if (!optionPlayer) {
          continue;
        }

        optionsList.push(optionPlayer.questionnaireAnswers[i]);
      }
      
      let currentQuestion: IQuizQuestion = {
        correctAnswer: correctAnswer,
        text: text,
        playerId: playerId,
        optionsList: optionsList
      }
      
      questionsList.push(currentQuestion);
    }
    
    return questionsList;
  }

export default { createQuestionnaireQuestions, generateQuiz };
