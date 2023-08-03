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
    text: "If you could spend $5000 only at one place, where would you spend it?",
    quizText:
      "If <PLAYER> could spend $5000 only at one place, where would they spend it?",
    fakeAnswers: ["kohl's", "target", "amazon", "Apple Store"],
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
    text: "What genre of music do you listen to the most?",
    quizText: "What genre of music does <PLAYER> listen to the most?",
    fakeAnswers: ["Pop", "rap", "country", "Idk"],
  },
  {
    text: "What is your favorite place that you have ever been?",
    quizText: "What is <PLAYER>'s favorite place that they have ever been?",
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
  {
    text: "What is your favorite flower?",
    quizText:"What is <PLAYER>'s favorite flower?",
    fakeAnswers: ["Chrysanthemum", "Hydrangea", "Peony", "Marigold"]
  },
  {
    text: "What is one question friendpardy should add?",
    quizText:"What is one question <PLAYER> thinks friendpardy should add?",
    fakeAnswers: ["Rick Roll Question","does player believe the earth is flat","Friendpardy is already perfect","Minecraft trivia"]
  },
  {
    text: "What is one short fond memory you have?",
    quizText:"What is one short fond memory <PLAYER> has?",
    fakeAnswers: ["My dad teaching me to drive a car","Going to a roller coaster park","My whole team cheering on a teammate","watching a movie with my friends"]
  },
];

const gptQuestions = [
  {
    text: "What is your earliest memory?",
    quizText: "What is <PLAYER>'s earliest memory?",
    fakeAnswers: ["christmas morning 1997", "My second birthday", "a weird nightmare I had", "my stuffed bunny"],
  },
  {
    text: "What is your dream car?",
    quizText: "What is <PLAYER>'s dream car?",
    fakeAnswers: ["Tesla Model S", "Ferrari 488 GTB", "jeep wrangler", "any car"],
  },
  {
    text: "What is your number one priority in life?",
    quizText: "What is <PLAYER>'s number one priority in life?",
    fakeAnswers: ["family", "Career success", "Personal growth", "to be happy"],
  },
  {
    text: "Who had the biggest impact on you in your youth?",
    quizText: "Who had the biggest impact on <PLAYER> in their youth?",
    fakeAnswers: ["my dad", "Mr. Johnson", "My friend Alan", "my grandma"],
  },
  {
    text: "If you were president, what executive order would you enact?",
    quizText: "If <PLAYER> were president, what executive order would they enact?",
    fakeAnswers: ["Universal healthcare", "climate change legislation", "UBI", "free pizza for everyone"],
  },
  {
    text: "What's one topic you could do a 15-minute presentation about without any preparation?",
    quizText: "What's one topic <PLAYER> could do a 15-minute presentation about without any preparation?",
    fakeAnswers: ["The power of meditation", "The history of Nintendo", "90s cartoons", "local wildlife"],
  },
  {
    text: "If aliens visited earth, what would you show them to best represent humanity?",
    quizText: "If aliens visited earth, what would <PLAYER> show them to best represent humanity?",
    fakeAnswers: ["works of art", "classical music", "live music, movies, art", "Paris then Tokyo then New Zealand"],
  },
  {
    text: "Where do you feel most comfortable?",
    quizText: "Where does <PLAYER> feel most comfortable?",
    fakeAnswers: ["at home with family", "In nature", "with friends", "on stage"],
  },
  {
    text: "If you had to flee the country, where would you go?",
    quizText: "If <PLAYER> had to flee the country, where would they go?",
    fakeAnswers: ["Canada", "New Zealand", "Sweden", "Costa Rica"],
  },
  {
    text: "What are you thinking about right now?",
    quizText: "What is <PLAYER> thinking about right now?",
    fakeAnswers: ["food", "Weekend plans", "Work", "this question"],
  },
  {
    text: "What's a slang word you think will be big in the 2040s?",
    quizText: "What's a slang word <PLAYER> thinks will be big in the 2040s?",
    fakeAnswers: ["zinko", "Fluzzled", "Ziggity", "Glimpse"],
  },
  {
    text: "What would you tweet if you knew everyone would see it?",
    quizText: "What would <PLAYER> tweet if they knew everyone would see it?",
    fakeAnswers: ["be kind", "i am so cool", "This too shall pass", "life is worth living"],
  },
  {
    text: "If you could instantly become an expert in any field, which one would you choose?",
    quizText: "If <PLAYER> could instantly become an expert in any field, which one would they choose?",
    fakeAnswers: ["Quantum physics", "AI", "architecture", "Culinary arts"],
  },
  {
    text: "What would your walk-up song be?",
    quizText: "What would <PLAYER>'s walk-up song be?",
    fakeAnswers: [
      "bad guy by Billie Eilish",
      "Welcome to the Jungle",
      "We Will Rock You",
      "all star by Smash Mouth",
    ],
  },
  {
    text: "What is your favorite quote?",
    quizText: "What is <PLAYER>'s favorite quote?",
    fakeAnswers: [
      "To be or not to be, that is the question",
      "life is like a box of choclates",
      "If you can dream it, you can do it",
      "Be yourself; everyone else is already taken",
      "to thine own self be true",
    ],
  },
  {
    text: "What food do you eat every day?",
    quizText: "What food does <PLAYER> eat every day?",
    fakeAnswers: [
      "pizza",
      "coffee",
      "Cereal",
      "Ramen",
      "Ham sandwich",
    ],
  },
  {
    text: "What three things would you bring if you were stuck on a deserted island?",
    quizText: "What three things would <PLAYER> bring if they were stuck on a deserted island?",
    fakeAnswers: [
      "A knife, a fishing net, and a good book",
      "a hammock, sunscreen, and a ukulele",
      "tent, first-aid kit, satellite phone",
      "Matches, a water filter, and a flare gun",
      "a pot for cooking, a hammock, and a radio",
      "A journal, a camera, and a pocket knife",
    ],
  },
  {
    text: "How do you like to start your day?",
    quizText: "How does <PLAYER> like to start their day?",
    fakeAnswers: [
      "with a strong coffee and some good music",
      "yoga and meditation",
      "i hit snooze like five times",
      "morning run",
      "watch Good Morning America",
    ],
  },
  {
    text: "In which fictional place would you most like to live?",
    quizText: "In which fictional place would <PLAYER> most like to live?",
    fakeAnswers: [
      "hogwarts",
      "Wakanda",
      "Middle Earth",
      "Naboo",
      "heaven",
      "wyoming",
    ],
  },
  {
    text: "What trend do you hope makes a comeback?",
    quizText: "What trend does <PLAYER> hope makes a comeback?",
    fakeAnswers: [
      "flared jeans",
      "Fanny packs (they're back)",
      "labor rights",
      "sideburns"
    ],
  },
  {
    text: "What do you do on the weekend?",
    quizText: "What does <PLAYER> do on the weekend?",
    fakeAnswers: [
      "play video games",
      "sleep",
      "watch tv",
      "Work"
    ],
  },
  {
    text: "What's your most used app on your phone?",
    quizText: "What's <PLAYER>'s most used app on their phone?",
    fakeAnswers: ["insta", "snapchat", "TikTok", "the calculator application"],
  },
  {
    text: "How will society be different in 50 years?",
    quizText: "According to <PLAYER>, how will society be different in 50 years?",
    fakeAnswers: ["hopefully there will be a better healthcare", "AI is taking over", "Climate change will escalate", "faster phones"]
  },
  {
    text: "If you could swap lives with anyone, who would you want to be?",
    quizText: "If <PLAYER> could swap lives with anyone, who would they want to be?",
    fakeAnswers: ["LeBron James", "Taylor swift", "Joe Biden", "anyone else"]
  },
  {
    text: "What song brings tears to your eyes every time you hear it?",
    quizText: "What song brings tears to <PLAYER>'s eyes every time they hear it?",
    fakeAnswers: [
      "Hallelujah by Leonard Cohen",
      "Someone Like You by Adele",
      "Fix You by Coldplay",
      "See You Again by Wiz Khalifa ft. Charlie Puth",
    ],
  },
  {
    text: "If you could relive one day of your life, what day would you choose?",
    quizText: "If <PLAYER> could relive one day of their life, what day would they choose?",
    fakeAnswers: [
      "July 9, 2019",
      "my seventh birthday",
      "the day I got my puppy :)",
      "Today"
    ]
  },
  {
    text: "What animal would you want as a companion?",
    quizText: "What animal would <PLAYER> want as a companion?",
    fakeAnswers: [
      "my dog",
      "A wolf",
      "An owl",
      "a tiger"
    ]
  },
  {
    text: "To whom in your life are you the most grateful?",
    quizText: "To whom in their life is <PLAYER> the most grateful?",
    fakeAnswers: [
      "My mom",
      "my best friend",
      "Mrs. Constantine",
      "the mailman"
    ]
  },
  {
    text: "What sport impresses you the most?",
    quizText: "What sport impresses <PLAYER> the most?",
    fakeAnswers: [
      "Golf",
      "mountain climbing",
      "Gymnastics",
      "Football"
    ]
  },
  {
    text: "What is your favorite dessert?",
    quizText: "What is <PLAYER>'s favorite dessert?",
    fakeAnswers: [
      "ice cream",
      "Chocolate cake",
      "ice cream cake from Mitchell's",
      "Oreos"
    ]
  },
  {
    text: "If you came across a leprechaun, how would you stop him from stealing your gold coins?",
    quizText: "If <PLAYER> came across a leprechaun, how would they stop him from stealing their gold coins?",
    fakeAnswers: [
      "through trickery",
      "fly away on a rainbow",
      "give him lucky charms instead",
      "Kick him"
    ]
  },
  {
    text: "What do you think about artificial intelligence?",
    quizText: "What does <PLAYER> think about artificial intelligence?",
    fakeAnswers: [
      "its power is overblown",
      "it is going to take over the world",
      "it will become a superintelligence and destroy us all",
      "it can't write well"
    ]
  },
  {
    text: "What do you think about aliens?",
    quizText: "What does <PLAYER> think about aliens?",
    fakeAnswers: [
      "they are definitely real",
      "they've been with us all along",
      "where are they? Fermi paradox",
      "We would have seen them by now"
    ]
  },
  {
    text: "What do you think about time travel?",
    quizText: "What does <PLAYER> think about time travel?",
    fakeAnswers: [
      "it can never be possible",
      "it's real and we've been visited by future people",
      "I would be scared to go to the past",
      "seems cool",
    ]
  },
  {
    text: "What are your thoughts on parallel universes?",
    quizText: "What does <PLAYER> think about parallel universes?",
    fakeAnswers: [
      "they're just a fun theory",
      "the MCU is failing",
      "pop culture does not understand the actual concept",
      "I think an infinite number exist"
    ]
  },
  {
    text: "What's your favorite conspiracy theory?",
    quizText: "What's <PLAYER>'s favorite conspiracy theory?",
    fakeAnswers: [
      "aliens built the pyramids",
      "government mind control through TV signals",
      "the moon landing was faked",
      "lizard people secretly run the world",
      "chemtrails are poisoning us",
      "Avril Lavigne is not Avril Lavigne"
    ]
  },
  {
    text: "What's your favorite urban legend or cryptid?",
    quizText: "What's <PLAYER>'s favorite urban legend or cryptid?",
    fakeAnswers: [
      "slenderman",
      "Bloody Mary",
      "Mothman",
      "bigfoot"
    ]
  },
  {
    text: "If you could time travel to any era, where would you go?",
    quizText: "If <PLAYER> could time travel to any era, where would they go?",
    fakeAnswers: [
      "the roaring twenties",
      "Medeival times",
      "Biblical times",
      "2040s"
    ]
  },
  {
    text: "What's one feature you would want for your dream home?",
    quizText: "What's one feature <PLAYER> would want for their dream home?",
    fakeAnswers: [
      "mid-century modern appointments",
      "A pool",
      "a huge yard",
      "floor-to-ceiling windows",
      "a smart kitchen"
    ]
  },
  {
    text: "If you were to design an amusement park, what theme would you choose for it?",
    quizText: "If <PLAYER> were to design an amusement park, what theme would they choose for it?",
    fakeAnswers: [
      "Horror / haunted house",
      "retrofuturistic",
      "Pirate theme",
      "Fantasy"
    ]
  },
  {
    text: "If you had unlimited resources, what would you be for a costume party?",
    quizText: "If <PLAYER> had unlimited resources, what would they be for a costume party?",
    fakeAnswers: [
      "a ghost",
      "Barbie",
      "Link from Zelda",
      "i don't like costumes"
    ]
  },
  {
    text: "If you were to start your own business, what kind of business would it be?",
    quizText: "If <PLAYER> were to start their own business, what kind of business would it be?",
    fakeAnswers: [
      "A software company",
      "restaurant",
      "a little coffee/book shop",
      "film studio"
    ]
  },
  {
    text: "What's one thing you predict will happen in the next ten years?",
    quizText: "What's one thing <PLAYER> predicts will happen in the next ten years?",
    fakeAnswers: [
      "the end of the world",
      "AI will take over Hollywood",
      "aliens will visit",
      "Nothing will change"
    ]
  },
];

export default [...arr, ...gptQuestions];
