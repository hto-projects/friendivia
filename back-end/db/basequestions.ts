const arr = [
  {
    text: "What is your favorite movie?",
    quizText: "What is <PLAYER>'s favorite movie?",
    fakeAnswers: [
      "The Godfather",
      "Despicable Me",
      "Into the Spiderverse",
      "Star Wars: A New Hope",
    ],
  },
  {
    text: "What do you do for fun?",
    quizText: "What does <PLAYER> do for fun?",
    fakeAnswers: ["Nothing", "watch tv", "play music", "Minecraft"],
  },
  {
    text: "Where were you born?",
    quizText: "Where was <PLAYER> born?",
    fakeAnswers: ["Ohio", "on Planet Earth", "Detroit, Michigan", "New York"],
  },
  {
    text: "What is your favorite animal?",
    quizText: "What is <PLAYER>'s favorite animal?",
    fakeAnswers: ["dog", "Tiger", "Grey Wolf", "Felis catus"],
  },
  {
    text: "How many sibling(s) do you have?",
    quizText: "How many sibling(s) does <PLAYER> have?",
    fakeAnswers: ["3", "none", "2", "9"],
  },
  {
    text: "What's your greatest fear?",
    quizText: "What's <PLAYER>'s greatest fear?",
    fakeAnswers: ["spiders", "no fears", "Worms", "DEATH"],
  },
  {
    text: "What's your favorite food?",
    quizText: "What's <PLAYER>'s favorite food?",
    fakeAnswers: ["pizza", "Pasta", "sushi", "Taco"],
  },
  {
    text: "What's your favorite day of the week?",
    quizText: "What's <PLAYER>'s favorite day of the week?",
    fakeAnswers: ["monday", "thursday", "Sunday", "Today"],
  },
  {
    text: "What is your birthday month?",
    quizText: "What is <PLAYER>'s birthday month?",
    fakeAnswers: ["March", "november", "June", "December"],
  },
  {
    text: "What is your zodiac sign?",
    quizText: "What is <PLAYER>'s zodiac sign?",
    fakeAnswers: ["sagittarius", "Libra", "leo", "Cancer"],
  },
  {
    text: "What is your favorite season?",
    quizText: "What is <PLAYER>'s favorite season?",
    fakeAnswers: ["Spring!!", "summer", "snowy winters", "fall"],
  },
  {
    text: "What is your favorite color?",
    quizText: "What is <PLAYER>'s favorite color?",
    fakeAnswers: ["Blue", "turquoise", "crimson", "Rainbow"],
  },
  {
    text: "If you could go anywhere in the world, where would you go?",
    quizText:
      "If <PLAYER> could go anywhere in the world, where would they go?",
    fakeAnswers: ["Eiffel Tower", "dubai", "Japan", "Home"],
  },
  {
    text: "Who is your favorite musical artist?",
    quizText: "Who is <PLAYER>'s favorite musical artist?",
    fakeAnswers: ["harry styles", "Taylor Swift", "weeknd", "Journey"],
  },
  {
    text: "What is your favorite ice cream flavor?",
    quizText: "What is <PLAYER>'s favorite ice cream flavor?",
    fakeAnswers: [
      "chocolate fudge brownie",
      "Strawberry",
      "raspberry",
      "VaNilla",
    ],
  },
  {
    text: "If you can spend $5000 only at one place, where would you spend it?",
    quizText:
      "If <PLAYER> can spend $5000 only at one place, where would they spend it?",
    fakeAnswers: ["kohl's", "target", "amazon", "Apple Store"],
  },
  {
    text: "What is one thing you are allergic to?",
    quizText: "What is one thing <PLAYER> is allergic to?",
    fakeAnswers: ["dust", "pollen", "latex", "mulberries"],
  },
  {
    text: "How many languages can you speak?",
    quizText: "How many languages can <PLAYER> speak?",
    fakeAnswers: ["zErO", "5", "two", "tres"],
  },
  {
    text: "If you could have any one superpower, what would it be?",
    quizText: "If <PLAYER> could have any one superpower, what would it be?",
    fakeAnswers: ["invisibility", "FLYYYY", "teleportation", "omniscient"],
  },
  {
    text: "What is your favorite book genre?",
    quizText: "What is <PLAYER>'s favorite book genre?",
    fakeAnswers: ["fantasy", "thriller", "Romance", "historical-fiction"],
  },
  {
    text: "If there were no consequences, what law would you break?",
    quizText: "If there were no consequences, what law would <PLAYER> break?",
    fakeAnswers: ["NO TAXES", "Share netflix password", "jaywalking"],
  },
  {
    text: "What is the name of your best friend?",
    quizText: "What is the name of <PLAYER>'s best friend?",
    fakeAnswers: ["Laura", "Jonathan", "Emmanuel", "Eliza"],
  },
  {
    text: "If you could remain the same age forever, what would it be?",
    quizText:
      "If <PLAYER> could remain the same age forever, what would it be?",
    fakeAnswers: ["8", "25", "two", "21"],
  },
  {
    text: "What did you dream of becoming when you were little?",
    quizText: "What did <PLAYER> dream of becoming when they were little?",
    fakeAnswers: ["truck driver", "gangster", "royalty", "Astronaut"],
  },
  {
    text: "If you were a vegetable, which one would you be?",
    quizText: "If <PLAYER> were a vegetable, which one would they be?",
    fakeAnswers: ["Broccoli", "Cucumber", "Carrot", "Zucchini"],
  },
  {
    text: "What food represents you best?",
    quizText: "What food represents <PLAYER> the best?",
    fakeAnswers: [
      "Chocolate covered peppers",
      "Mango Salsa",
      "Avocado",
      "PIZZA PIZZA",
    ],
  },
  {
    text: "What is your favorite word?",
    quizText: "What do you think is <PLAYER>'s favorite word?",
    fakeAnswers: ["Indubitably", "Flabbergasted!", "Friendpardy", "asymmetry"],
  },
  {
    text: "What is your favorite emoji?",
    quizText: "What is <PLAYER>'s favorite emoji?",
    fakeAnswers: ["🦅", "poop emoji", "(。_。)", "🥱"],
  },
  {
    text: "What genre of music do you listen to?",
    quizText: "What genre of music does <PLAYER> listen to?",
    fakeAnswers: ["Pop", "rap", "country", "Idk"],
  },
  {
    text: "What is your favorite place that you have been to?",
    quizText: "What is <PLAYER>'s favorite place that they have gone to?",
    fakeAnswers: ["Home", "Niagara Falls", "Chipotle", "Kauai Hawaii"],
  },
  {
    text: "What is one adjective that you would use to describe yourself?",
    quizText: "What adjective does <PLAYER> use to describe themselves?",
    fakeAnswers: ["Empathetic", "humble", "perfect", "perfectionist"],
  },
  {
    text: "What is one career field that you work in or are interested in?",
    quizText:
      "What is one career field that <PLAYER> works in or is interested in?",
    fakeAnswers: ["Computer science", "Law", "biology", "Automotive"],
  },
];

export default arr;
