import IPlayer from "../interfaces/IPlayer";
import IQuestionnaireQuestion from "../interfaces/IQuestionnaireQuestion";
import IQuizQuestion from "../interfaces/IQuizQuestion";


function getNumberOfQuestions(players) {
  let temporaryNum; 
  if(players.length <= 3)
  {
    temporaryNum = 5
  }
  else if(players.length <= 5)
  {
    temporaryNum = 3
  }
  else if(players.length <= 8)
  {
    temporaryNum = 2
  }
  else{
    temporaryNum = 1
  }
  return temporaryNum;
}

const arr = [
  {
    text: "What is your favorite movie?",
    quizText: "What is <PLAYER>'s favorite movie?",
    fakeAnswers: ["The Godfather", "Despicable Me", "Into the Spiderverse"]
  },
  {
    text: "What do you do for fun?",
    quizText: "What does <PLAYER> do for fun?",
    fakeAnswers: ["Nothing", "watch tv", "play music"]
  },
  {
    text: "Where were you born?",
    quizText: "Where was <PLAYER> born?",
    fakeAnswers: ["Ohio", "on Planet Earth", "Detroit, Michigan"]
  },
  {
    text: "What is your favorite animal?",
    quizText: "What is <PLAYER>'s favorite animal?",
    fakeAnswers: ["dog", "Tiger", "Grey Wolf"]
  },
  {
    text: "How many sibling(s) do you have?",
    quizText: "How many sibling(s) does <PLAYER> have?",
    fakeAnswers: ["0", "none", "2"]
  },
  {
    text: "What's your greatest fear?",
    quizText: "What's <PLAYER>'s greatest fear?",
    fakeAnswers: ["spiders", "no fears", "Worms"]
  },
  {
    text: "What's your favorite food?",
    quizText: "What's <PLAYER>'s favorite food?",
    fakeAnswers: ["pizza", "Pasta", "sushi"]
  },
  {
    text: "What's your favorite day of the week?",
    quizText: "What's <PLAYER>'s favorite day of the week?",
    fakeAnswers: ["monday", "thursday", "Sunday"]
  },
  {
    text: "What is your birthday month?",
    quizText: "What is <PLAYER>'s birthday month?",
    fakeAnswers: ["March", "november", "June"]
  },
  {
    text: "What is your zodiac sign?",
    quizText: "What is <PLAYER>'s zodiac sign?",
    fakeAnswers: ["sagittarius", "Libra", "leo"]
  },
  {
    text: "What is your favorite season?",
    quizText: "What is <PLAYER>'s favorite season?",
    fakeAnswers: ["Spring!!", "summer", "snowy winters"]
  },
  {
    text: "What is your favorite color?",
    quizText: "What is <PLAYER>'s favorite color?",
    fakeAnswers: ["Blue", "turquoise", "crimson"]
  },
  {
    text: "If you could go anywhere in the world, where would you go?",
    quizText: "If <PLAYER> could go anywhere in the world, where would they go?",
    fakeAnswers: ["Eiffel Tower", "dubai", "Japan"]
  },
  {
    text: "Who is your favorite singer?",
    quizText: "Who is <PLAYER>'s favorite singer?",
    fakeAnswers: ["harry styles", "Taylor Swift", "weeknd"]
  },
  {
    text: "What is your favorite ice cream flavor?",
    quizText: "What is <PLAYER>'s favorite ice cream flavor?",
    fakeAnswers: ["chocolate fudge brownie", "Strawberry", "raspberry"]
  },
  {
    text: "If you can spend $5000 only at one place, where would you spend it?",
    quizText: "If <PLAYER> can spend $5000 only at one place, where would they spend it?",
    fakeAnswers: ["kohl's", "target", "amazon"]
  },
  {
    text: "What is one thing you are allergic to?",
    quizText: "What is one thing <PLAYER> is allergic to?",
    fakeAnswers: ["dust", "pollen", "latex"]
  },
  {
    text: "How many languages can you speak?",
    quizText: "How many languages can <PLAYER> speak?",
    fakeAnswers: ["zErO", "5", "two"]
  },
  {
    text: "If you could have any one superpower, what would it be?",
    quizText: "If <PLAYER> could have any one superpower, what would it be?",
    fakeAnswers: ["invisibility", "FLYYYY", "teleportation"]
  },
  {
    text: "What is your favorite book genre?",
    quizText: "What is <PLAYER>'s favorite book genre?",
    fakeAnswers: ["fantasy", "thriller", "Romance"]
  },
  {
    text: "If there were no consequences, what law would you break?",
    quizText: "If there were no consequences, what law would <PLAYER> break?",
    fakeAnswers: ["NO TAXES", "Share netflix password", "jaywalking"]
  },
  {
    text: "What is the name of your best friend?",
    quizText: "What is the name of <PLAYER>'s best friend?",
    fakeAnswers: ["Laura", "Jonathan", "Emmanuel"]
  },
  {
    text: "If you could remain the same age forever, what would it be?",
    quizText: "If <PLAYER> could remain the same age forever, what would it be?",
    fakeAnswers: ["8", "25", "two"]
  },
  {
    text: "What did you dream of becoming when you were little?",
    quizText: "What did <PLAYER> dream of becoming when they were little?",
    fakeAnswers: ["truck driver", "gangster", "royalty"]
  }
]

let tempArr = arr;

const createQuestionnaireQuestionsWithOptions = async (players, num): Promise<IQuestionnaireQuestion[]> => {
  if(num===1)
  {
    shuffle(tempArr)
  }
  let Arr: any[] = []
    for(let i=0; i<getNumberOfQuestions(players); i++){
      Arr.push(tempArr[i])
    }
  return Arr;


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
      const text: string = currentQuestionnaireQ.quizText;
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
