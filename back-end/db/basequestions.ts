const arr = [
  {
    text: "What is your favorite movie?",
    quizText: "What is <PLAYER>'s favorite movie?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
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
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    fakeAnswers: ["Nothing", "watch tv", "play music", "Minecraft"],
  },
  {
    text: "Where were you born?",
    quizText: "Where was <PLAYER> born?",
    tags: ["classic", "classroom", "corporate", "fun"],
    fakeAnswers: ["Ohio", "on Planet Earth", "Detroit, Michigan", "New York"],
  },
  {
    text: "What is your favorite animal?",
    quizText: "What is <PLAYER>'s favorite animal?",
    tags: ["classic", "classroom", "fun"],
    fakeAnswers: ["dog", "Tiger", "Grey Wolf", "Felis catus"],
  },
  {
    text: "What's your greatest fear?",
    tags: ["frp"],
    quizText: "What's <PLAYER>'s greatest fear?",
    fakeAnswers: ["spiders", "no fears", "Worms", "DEATH"],
  },
  {
    text: "What's your favorite food?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "What's <PLAYER>'s favorite food?",
    fakeAnswers: ["pizza", "Pasta", "sushi", "Taco"],
  },
  {
    text: "If you could go anywhere in the world, where would you go?",
    quizText:
      "If <PLAYER> could go anywhere in the world, where would they go?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    fakeAnswers: ["Eiffel Tower", "dubai", "Japan", "Home"],
  },
  {
    text: "Who is your favorite musical artist?",
    quizText: "Who is <PLAYER>'s favorite musical artist?",
    tags: ["classic", "classroom", "corporate", "fun"],
    fakeAnswers: ["harry styles", "Taylor Swift", "weeknd", "Journey"],
  },
  {
    text: "What is your favorite ice cream flavor?",
    tags: ["classic", "classroom"],
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
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText:
      "If <PLAYER> could spend $5000 only at one place, where would they spend it?",
    fakeAnswers: ["kohl's", "target", "amazon", "Apple Store"],
  },
  {
    text: "If you could have any one superpower, what would it be?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "If <PLAYER> could have any one superpower, what would it be?",
    fakeAnswers: ["invisibility", "FLYYYY", "teleportation", "omniscient"],
  },
  {
    text: "What is your favorite book genre?",
    tags: ["classic", "classroom", "corporate"],
    quizText: "What is <PLAYER>'s favorite book genre?",
    fakeAnswers: ["fantasy", "thriller", "Romance", "historical-fiction"],
  },
  {
    text: "If there were no consequences, what law would you break?",
    tags: ["frp"],
    quizText: "If there were no consequences, what law would <PLAYER> break?",
    fakeAnswers: ["NO TAXES", "Share netflix password", "jaywalking"],
  },
  {
    text: "What is the name of your best friend?",
    tags: ["classroom", "fun", "frp"],
    quizText: "What is the name of <PLAYER>'s best friend?",
    fakeAnswers: ["Laura", "Jonathan", "Emmanuel", "Eliza"],
  },
  {
    text: "If you could remain the same age forever, what would it be?",
    tags: ["classic", "fun", "frp"],
    quizText:
      "If <PLAYER> could remain the same age forever, what would it be?",
    fakeAnswers: ["8", "25", "two", "21"],
  },
  {
    text: "What did you dream of becoming when you were little?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "What did <PLAYER> dream of becoming when they were little?",
    fakeAnswers: ["truck driver", "gangster", "royalty", "Astronaut"],
  },
  {
    text: "If you were a vegetable, which one would you be?",
    tags: ["classic", "classroom", "fun"],
    quizText: "If <PLAYER> were a vegetable, which one would they be?",
    fakeAnswers: ["Broccoli", "Cucumber", "Carrot", "Zucchini"],
  },
  {
    text: "What food represents you best?",
    tags: ["classic", "corporate", "fun"],
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
    tags: ["fun", "frp"],
    quizText: "What do you think is <PLAYER>'s favorite word?",
    fakeAnswers: ["Indubitably", "Flabbergasted!", "Friendivia", "asymmetry"],
  },
  {
    text: "What genre of music do you listen to the most?",
    tags: ["classic", "classroom", "corporate"],
    quizText: "What genre of music does <PLAYER> listen to the most?",
    fakeAnswers: ["Pop", "rap", "country", "Idk"],
  },
  {
    text: "What is your favorite place that you have ever been?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What is <PLAYER>'s favorite place that they have ever been?",
    fakeAnswers: ["Home", "Niagara Falls", "Chipotle", "Kauai Hawaii"],
  },
  {
    text: "What is one adjective that you would use to describe yourself?",
    tags: ["classic", "corporate", "fun"],
    quizText: "What adjective does <PLAYER> use to describe themselves?",
    fakeAnswers: ["Empathetic", "humble", "perfect", "perfectionist"],
  },
  {
    text: "What is one career field that interests you?",
    tags: ["classic", "classroom"],
    quizText:
      "What is one career field that interests <PLAYER>?",
    fakeAnswers: ["Computer science", "Law", "biology", "Automotive"],
  },
];

const gptQuestions = [
  {
    text: "What is your earliest memory?",
    tags: ["frp"],
    quizText: "What is <PLAYER>'s earliest memory?",
    fakeAnswers: ["christmas morning 1997", "My second birthday", "a weird nightmare I had", "my stuffed bunny"],
  },
  {
    text: "What is your dream car?",
    tags: ["classic", "corporate"],
    quizText: "What is <PLAYER>'s dream car?",
    fakeAnswers: ["Tesla Model S", "Ferrari 488 GTB", "jeep wrangler", "any car"],
  },
  {
    text: "What is your number one priority in life?",
    tags: ["frp"],
    quizText: "What is <PLAYER>'s number one priority in life?",
    fakeAnswers: ["family", "Career success", "Personal growth", "to be happy"],
  },
  {
    text: "Who had the biggest impact on you in your youth?",
    tags: ["classic"],
    quizText: "Who had the biggest impact on <PLAYER> in their youth?",
    fakeAnswers: ["my dad", "Mr. Johnson", "My friend Alan", "my grandma"],
  },
  {
    text: "If you were president, what executive order would you enact?",
    tags: ["classic", "classroom", "fun", "frp"],
    quizText: "If <PLAYER> were president, what executive order would they enact?",
    fakeAnswers: ["Universal healthcare", "climate change legislation", "UBI", "free pizza for everyone"],
  },
  {
    text: "What's one topic you could do a 15-minute presentation about without any preparation?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What's one topic <PLAYER> could do a 15-minute presentation about without any preparation?",
    fakeAnswers: ["The power of meditation", "The history of Nintendo", "90s cartoons", "local wildlife"],
  },
  {
    text: "If aliens visited earth, what would you show them to best represent humanity?",
    tags: ["fun", "frp"],
    quizText: "If aliens visited earth, what would <PLAYER> show them to best represent humanity?",
    fakeAnswers: ["works of art", "classical music", "live music, movies, art", "Paris then Tokyo then New Zealand"],
  },
  {
    text: "Where do you feel most comfortable?",
    tags: ["classic", "corporate", "fun"],
    quizText: "Where does <PLAYER> feel most comfortable?",
    fakeAnswers: ["at home with family", "In nature", "with friends", "on stage"],
  },
  {
    text: "If you had to flee the country, where would you go?",
    tags: ["frp"],
    quizText: "If <PLAYER> had to flee the country, where would they go?",
    fakeAnswers: ["Canada", "New Zealand", "Sweden", "Costa Rica"],
  },
  {
    text: "What are you thinking about right now?",
    tags: ["fun", "frp"],
    quizText: "What is <PLAYER> thinking about right now?",
    fakeAnswers: ["food", "Weekend plans", "Work", "this question"],
  },
  {
    text: "What's a slang word you think will be big in the 2040s?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What's a slang word <PLAYER> thinks will be big in the 2040s?",
    fakeAnswers: ["zinko", "Fluzzled", "Ziggity", "Glimpse"],
  },
  {
    text: "What would you tweet if you knew everyone would see it?",
    tags: ["fun", "frp"],
    quizText: "What would <PLAYER> tweet if they knew everyone would see it?",
    fakeAnswers: ["be kind", "i am so cool", "This too shall pass", "life is worth living"],
  },
  {
    text: "If you could instantly become an expert in any field, which one would you choose?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> could instantly become an expert in any field, which one would they choose?",
    fakeAnswers: ["Quantum physics", "AI", "architecture", "Culinary arts"],
  },
  {
    text: "What would your walk-up song be?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
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
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
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
    tags: ["classic", "classroom", "corporate", "fun"],
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
    tags: ["classic", "corporate"],
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
    tags: ["classic", "corporate", "fun"],
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
    tags: ["classic", "classroom", "corporate"],
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
    tags: ["classic", "corporate", "fun", "frp"],
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
    tags: ["classic", "corporate", "fun"],
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
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What's <PLAYER>'s most used app on their phone?",
    fakeAnswers: ["insta", "snapchat", "TikTok", "the calculator application"],
  },
  {
    text: "How will society be different in 50 years?",
    tags: ["classic", "corporate", "frp"],
    quizText: "According to <PLAYER>, how will society be different in 50 years?",
    fakeAnswers: ["hopefully there will be better healthcare", "AI is taking over", "Climate change will escalate", "faster phones"]
  },
  {
    text: "If you could swap lives with anyone, who would you want to be?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> could swap lives with anyone, who would they want to be?",
    fakeAnswers: ["LeBron James", "Taylor swift", "Joe Biden", "anyone else"]
  },
  {
    text: "What song brings tears to your eyes every time you hear it?",
    tags: ["frp"],
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
    tags: ["frp"],
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
    tags: ["classic", "classroom", "corporate", "fun"],
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
    tags: ["frp"],
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
    tags: ["classic", "corporate", "frp"],
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
    tags: ["classic", "classroom", "corporate", "fun"],
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
    tags: ["fun", "frp"],
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
    tags: ["corporate", "frp"],
    quizText: "What does <PLAYER> think about artificial intelligence?",
    fakeAnswers: [
      "Its power is overblown",
      "it is going to take over the world",
      "It will become a superintelligence and destroy us all",
      "it can't write well"
    ]
  },
  {
    text: "What do you think about aliens?",
    tags: ["fun", "frp"],
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
    tags: ["fun", "frp"],
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
    tags: ["fun", "frp"],
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
    tags: ["fun", "frp"],
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
    tags: ["fun", "frp"],
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
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
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
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
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
    tags: ["classic", "corporate", "fun", "frp"],
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
    tags: ["classic", "corporate", "fun", "frp"],
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
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
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
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What's one thing <PLAYER> predicts will happen in the next ten years?",
    fakeAnswers: [
      "the end of the world",
      "AI will take over Hollywood",
      "aliens will visit",
      "Nothing will change"
    ]
  }
];

const gptQuestions2 = [
  {
    text: "What's your favorite meme?",
    tags: ["classic", "corporate"],
    quizText: "What's <PLAYER>'s favorite meme?",
    fakeAnswers: [
      "distracted boyfriend",
      "pepe the frog",
      "woman yelling at a cat",
      "crying Jordan",
      "i hate memes"
    ],
  },
  {
    text: "If you could have any fictional character as your best friend, who would it be?",
    tags: ["classic", "corporate"],
    quizText: "If <PLAYER> could have any fictional character as their best friend, who would it be?",
    fakeAnswers: [
      "harry potter",
      "spongbob squarepants",
      "Sherlock Holmes",
      "Froyo from Frozen",
    ],
  },
  {
    text: "What's your favorite way to relax after a long day?",
    tags: ["classic", "corporate"],
    quizText: "What's <PLAYER>'s favorite way to relax after a long day?",
    fakeAnswers: [
      "netflix and chill",
      "read book",
      "meditate",
      "drink tea",
    ],
  },
  {
    text: "If you could have a conversation with a pet, what's the first thing you'd ask?",
    tags: ["classic", "classroom", "corporate"],
    quizText: "If <PLAYER> could talk to a pet, what's the first thing they'd ask?",
    fakeAnswers: [
      "how's your day, buddy?",
      "Where do you hide my socks?",
      "wats up",
      "What's the secret to happiness?",
    ],
  },
  {
    text: "What's a skill you'd love to master?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "What's a skill <PLAYER> would love to master?",
    fakeAnswers: [
      "play gitaur",
      "cooking like The Bear",
      "speak 5 languages",
      "unicycle riding",
    ],
  },
  {
    text: "What's your favorite way to unwind?",
    tags: ["classic", "corporate", "frp"],
    quizText: "What's <PLAYER>'s favorite way to unwind?",
    fakeAnswers: [
      "listening to music",
      "watching sunsets",
      "taking a long bath",
      "eating chocolate",
    ],
  },
  {
    text: "If you could have dinner with any historical figure, who would it be?",
    tags: ["classic", "classroom", "corporate"],
    quizText: "If <PLAYER> could have dinner with any historical figure, who would it be?",
    fakeAnswers: [
      "Albert Einstein",
      "spongebob",
      "MrBeast",
      "Marie Curie",
    ],
  },
  {
    text: "What's your go-to comfort food?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "What's <PLAYER>'s go-to comfort food?",
    fakeAnswers: [
      "mac and cheese",
      "chicken soup",
      "ice cream",
      "mashed potatoes",
    ],
  },
  {
    text: "If you could instantly become fluent in a new language, which one would you choose?",
    tags: ["classic", "corporate"],
    quizText: "If <PLAYER> could instantly become fluent in a new language, which one would they choose?",
    fakeAnswers: [
      "spanish",
      "japanese",
      "french",
      "italian",
    ],
  },
  {
    text: "What is your favorite outdoor activity?",
    tags: ["classic", "classroom", "corporate"],
    quizText: "What is <PLAYER>'s favorite outdoor activity?",
    fakeAnswers: [
      "hiking",
      "picnicking",
      "beach volleyball",
      "biking",
    ],
  },
  {
    text: "Wat is your dream vacation destination?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What's <PLAYER>'s dream vacation destination?",
    fakeAnswers: [
      "Bora Bora",
      "Santorini",
      "Tokyo",
      "New Zealand",
    ],
  },
  {
    text: "What is your go-to karaoke song?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What's <PLAYER>'s go-to karaoke song?",
    fakeAnswers: [
      "Bohemian Rhapsody",
      "Don't Stop Believin'",
      "Sweet Caroline",
      "Wannabe by the spice girls",
    ],
  },
  {
    text: "If you could meet any fictional character, who would it be?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "If <PLAYER> could meet any fictional character, who would it be?",
    fakeAnswers: [
      "Harry Potter",
      "JEsus",
      "spider-man",
      "avatar from avatar",
    ],
  },
  {
    text: "How do you like to spend a rainy day?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "How does <PLAYER> like to spend a rainy day?",
    fakeAnswers: [
      "reading a book",
      "watching movies",
      "baking cookies",
      "napping",
    ],
  },
  {
    text: "What is a hobby you'd like to try?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What is a hobby <PLAYER> would like to try?",
    fakeAnswers: [
      "painting",
      "playing guitar",
      "cooking",
      "rock climbing",
      "fashion design"
    ],
  },
  {
    text: "How do you spend your Saturdays?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "How does <PLAYER> spend their Saturdays?",
    fakeAnswers: [
      "sleeping in",
      "making pancakes",
      "going to the park or beach",
      "working",
    ],
  },
  {
    text: "How would you like to spend your Saturdays?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "How would <PLAYER> like to spend their Saturdays?",
    fakeAnswers: [
      "sleeping in",
      "eating at good restaurants",
      "Having fun",
      "Relaxing",
    ],
  },
  {
    text: "If you could be a character in a video game, who would it be?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "If <PLAYER> could be a character in a video game, who would they choose?",
    fakeAnswers: [
      "Mario",
      "Link from Zelda",
      "master chief",
      "kirby",
      "joey from the last of us"
    ],
  },
  {
    text: "What type of weather do you enjoy most?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "What type of weather does <PLAYER> enjoy most?",
    fakeAnswers: [
      "sun",
      "clear skies and sun",
      "snow",
      "Crisp fall weather",
    ],
  },
  {
    text: "What TV show do you watch as a guilty pleasure?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What TV show does <PLAYER> watch as a guilty pleasure?",
    fakeAnswers: [
      "The Bachelor",
      "the kardashians",
      "Bad reality TV",
      "The Wire",
    ],
  },
  {
    text: "What is a famous landmark you'd love to visit?",
    tags: ["classic", "corporate", "fun"],
    quizText: "What is a famous landmark <PLAYER> would love to visit?",
    fakeAnswers: [
      "the Great Wall of China",
      "Machu Picchu",
      "the Taj Mahal",
      "the Colosseum",
    ],
  },
  {
    text: "What song always makes you want to dance?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What song always makes <PLAYER> want to dance?",
    fakeAnswers: [
      "none, i hate dancing",
      "Dance Yrself Clean",
      "anything by Britney",
      "James Brown - get up offa that thing"
    ]
  },
  {
    text: "What do you think about exotic cuisines?",
    tags: ["fun", "frp"],
    quizText: "What does <PLAYER> think about exotic cuisines?",
    fakeAnswers: [
      "I love trying new things!",
      "no thanks",
      "I need more",
      "not sure",
    ]
  },
  {
    text: "What do you think about contemporary art?",
    tags: ["frp"],
    quizText: "What does <PLAYER> think about contemporary art?",
    fakeAnswers: [
      "it sucks",
      "it can be good",
      "I appreciate the creativity behind it.",
      "Modern art can be quite abstract.",
    ]
  },
  {
    text: "If you could have any animal as a pet, what would it be?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "If <PLAYER> could have any animal as a pet, what would it be?",
    fakeAnswers: [
      "A red panda",
      "dolphin",
      "A sloth",
      "Meerkat",
      "cat",
      "dog",
      "a spider"
    ],
  },
  {
    text: "What's one piece of advice you would give to your younger self?",
    tags: ["classic", "corporate", "frp"],
    quizText: "What's one piece of advice <PLAYER> would give to their younger self?",
    fakeAnswers: [
      "don't be afraid to take risks",
      "There's nothing you can do",
      "Stay true to yourself",
      "Don't worry",
    ],
  }, 
  {
    text: "If you could solve one global problem, what would it be?",
    tags: ["corporate", "frp"],
    quizText: "If <PLAYER> could solve one global problem, what would it be?",
    fakeAnswers: [
      "End world hunger",
      "reverse climate change",
      "Achieve world peace",
      "Cure all diseases",
    ],
  },
  {
    text: "If you could have a conversation with a famous work of art, which one would it be?",
    tags: ["fun", "frp"],
    quizText: "If <PLAYER> could have a conversation with a famous work of art, which one would it be?",
    fakeAnswers: [
      "Mona Lisa",
      "Starry Night",
      "The Scream",
      "The Persistence of Memory",
    ],
  },
  { 
    text: "What's your favorite scent?",
    tags: ["fun", "frp"],
    quizText: "What's <PLAYER>'s favorite scent?",
    fakeAnswers: [
      "fresh cut grass",
      "Cool breeze",
      "Coffee",
      "gasoline"
    ]
  },
  { 
    text: "What's the last great TV show or movie you watched?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What's the last great TV show or movie <PLAYER> watched?",
    fakeAnswers: [
      "Breaking Bad",
      "Severance",
      "the office",
      "the wire"
    ]
  },
  { 
    text: "What's the best book you've ever read?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What's the best book <PLAYER> has ever read?",
    fakeAnswers: [
      "Little Women",
      "IT",
      "i don't read",
      "The Godfather"
    ]
  },
  { 
    text: "What's the most impactful book you've ever read?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What's the most impactful book <PLAYER> has ever read?",
    fakeAnswers: [
      "Blink",
      "The bible",
      "nothing",
      "i don't read"
    ]
  },
  { 
    text: "What is your favorite form of exercise?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What is <PLAYER>'s favorite form of exercise?",
    fakeAnswers: [
      "running",
      "swimming",
      "Hiking",
      "Walking"
    ]
  },
  { 
    text: "What did you eat for breakfast this morning?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What did <PLAYER> eat for breakfast this morning?",
    fakeAnswers: [
      "a banana",
      "Froot Loops",
      "nothing, just coffee",
      "nothing"
    ]
  },
  { 
    text: "If you had a podcast, who would you want as a guest?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> had a podcast, who would they want as a guest?",
    fakeAnswers: [
      "Joe BRiggs",
      "Joe biden",
      "MrBeast",
      "marc maron"
    ]
  },
  { 
    text: "In which decade would you most like to live?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "In which decade would <PLAYER> most like to live?",
    fakeAnswers: [
      "2090's",
      "1990s",
      "80's",
      "the future"
    ]
  },
  { 
    text: "Which class did you enjoy the most in your life?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "Which class did <PLAYER> enjoy the most in their life?",
    fakeAnswers: [
      "english",
      "6th grade ELA",
      "Calculus",
      "calc AB"
    ]
  },
  { 
    text: "What kind of sandwich do you like most?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What kind of sandwich does <PLAYER> like most?",
    fakeAnswers: [
      "burgers",
      "turkey",
      "Tuna",
      "i hate sandiwches"
    ]
  },
  { 
    text: "If you had to perform in a talent show tonight, what would you do for it?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> had to perform in a talent show tonight, what would they do for it?",
    fakeAnswers: [
      "probably sing",
      "Juggle",
      "I have no talents :(",
      "code"
    ]
  },
  { 
    text: "What would you wear if you had to wear the same thing for the rest of your life?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What would <PLAYER> wear if they had to wear the same thing for the rest of their life?",
    fakeAnswers: [
      "a hat",
      "T shirt and pants",
      "Hawaiian shirt baby",
      "something practical"
    ]
  },
  { 
    text: "Who would you add to Mount Rushmore?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "Who would <PLAYER> add to Mount Rushmore?",
    fakeAnswers: [
      "George Washington",
      "Allen Iverson",
      "LeBron James",
      "joe bdien"
    ]
  },
  { 
    text: "What olympic sport would be the hardest for you?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What olympic sport would be the hardest for <PLAYER>?",
    fakeAnswers: [
      "swimming",
      "ski jumping",
      "luge",
      "CURLING"
    ]
  },
  { 
    text: "What is your favorite time of day?",
    tags: ["classic", "classroom", "corporate", "frp"],
    quizText: "What is <PLAYER>'s favorite time of day?",
    fakeAnswers: [
      "morning",
      "noon",
      "night",
      "9:02pm"
    ]
  },
  { 
    text: "What breed of dog would you be?",
    tags: ["classic", "classroom", "corporate", "fun"],
    quizText: "What breed of dog would <PLAYER> be?",
    fakeAnswers: [
      "golden retriever",
      "pit bull",
      "little one",
      "Shnauser"
    ]
  },
  { 
    text: "What is one thing no one knows about you?",
    tags: ["frp"],
    quizText: "What is one thing no one knows about <PLAYER>?",
    fakeAnswers: [
      "I am secretly mean",
      "nothing",
      "I have no secrets",
      "Not telling"
    ]
  },
  { 
    text: "What is your phone wallpaper?",
    tags: ["corporate", "fun", "frp"],
    quizText: "What is <PLAYER>'s phone wallpaper?",
    fakeAnswers: [
      "my wife",
      "a picture of a tree",
      "Me and my significant other",
      "whatever was default"
    ]
  },
  { 
    text: "If you could have an unlimited supply of one thing, what would it be?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> could have an unlimited supply of one thing, what would it be?",
    fakeAnswers: [
      "money",
      "$$$$$",
      "cookies",
      "Happiness"
    ]
  },
  { 
    text: "If you were immortal, what would you do?",
    tags: ["fun", "frp"],
    quizText: "If <PLAYER> were immortal, what would they do?",
    fakeAnswers: [
      "wait",
      "See the world",
      "Hopefully learn space travel",
      "not sure"
    ]
  },
  { 
    text: "If you could teleport anywhere right now, where would you go?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> could teleport anywhere right now, where would they go?",
    fakeAnswers: [
      "not sure",
      "home",
      "The tropics",
      "the bahamas"
    ]
  },
  { 
    text: "What is the hardest you can ever remember laughing?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What is the hardest <PLAYER> can ever remember laughing?",
    fakeAnswers: [
      "watching family guy",
      "Late nights with friends",
      "Playing jackbox TKO",
      "at the pool one time"
    ]
  },
  { 
    text: "What is the best dish you can cook?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What is the best dish <PLAYER> can cook?",
    fakeAnswers: [
      "Hot Dog",
      "spam musubi",
      "milk and cereal",
      "Pasta Primavera"
    ]
  },
  { 
    text: "What do you like to eat as a midnight snack?",
    tags: ["classic", "corporate", "frp"],
    quizText: "What does <PLAYER> like to eat as a midnight snack?",
    fakeAnswers: [
      "graham crackers",
      "ew",
      "Probably nothing",
      "Whatever's around"
    ]
  },
  { 
    text: "If you could have any career, what would you choose to be?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"], 
    quizText: "If <PLAYER> could have any career, what would they choose to be?",
    fakeAnswers: [
      "Architect",
      "CEO of Google",
      "President",
      "whatever"
    ]
  },
  { 
    text: "If you could take a class on anything, what subject would you choose?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> could take a class on anything, what subject would they choose?",
    fakeAnswers: [
      "Marketing",
      "art history",
      "Architecture",
      "Televeision"
    ]
  },
  { 
    text: "If you could only eat one dessert for the rest of your life, what would it be?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> could only eat one dessert for the rest of their life, what would it be?",
    fakeAnswers: [
      "oreos",
      "Chocolate cake",
      "banana pudding",
      "peanut M&Ms"
    ]
  },
  { 
    text: "If you had a million dollars, what unconventional thing would you buy?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> had a million dollars, what unconventional thing would they buy?",
    fakeAnswers: [
      "an unconventional house",
      "a jetpack",
      "An aquarium",
      "a little fish"
    ]
  },
  { 
    text: "Who is your favorite Disney character?",
    tags: ["classic", "classroom", "fun"],
    quizText: "Who is <PLAYER>'s favorite Disney character?",
    fakeAnswers: [
      "Little Mermaid",
      "technically Homer Simpson",
      "Yoda",
      "Genie from Alladin"
    ]
  },
  { 
    text: "What is the biggest problem facing humanity today?",
    tags: ["classic", "corporate", "frp"],
    quizText: "According to <PLAYER>, what is the biggest problem facing humanity today?",
    fakeAnswers: [
      "bad stuff",
      "climate change",
      "income inequality",
      "A.I."
    ]
  },
  { 
    text: "What's something you've learned about yourself in the past three months?",
    tags: ["corporate", "frp"],
    quizText: "What's something <PLAYER> has learned about themselves in the past three months?",
    fakeAnswers: [
      "nothing",
      "I can do it",
      "I'm stronger than I think",
      "i like cheese"
    ]
  },
  { 
    text: "What is your most impressive skill?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What is <PLAYER>'s most impressive skill?",
    fakeAnswers: [
      "Beatboxing",
      "probably playing music",
      "no skills",
      "Idk"
    ]
  },
  { 
    text: "What makes you feel nostalgic?",
    tags: ["classic", "frp"],
    quizText: "What makes <PLAYER> feel nostalgic?",
    fakeAnswers: [
      "the autumn",
      "Looking at old photos",
      "EVerything man",
      "trees"
    ]
  },
  { 
    text: "What inspires you?",
    tags: ["classic", "corporate", "frp"],
    quizText: "What inspires <PLAYER>?",
    fakeAnswers: [
      "nothing",
      "Idk",
      "watching good movies",
      "competition"
    ]
  },
  { 
    text: "What mobile game do you play the most?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What mobile game does <PLAYER> play the most?",
    fakeAnswers: [
      "Candy Crush",
      "idk it's weird",
      "2048",
      "I don't"
    ]
  },
  { 
    text: "What video game do you play the most?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What video game does <PLAYER> play the most?",
    fakeAnswers: [
      "Zelda",
      "TOTK",
      "tetris",
      "not a gamer sorry"
    ]
  },
  { 
    text: "What game did you play the most as a kid?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What game did <PLAYER> play the most as a kid?",
    fakeAnswers: [
      "Monopoly",
      "Super Mario World SNES",
      "Fortnite",
      "Minecraft"
    ]
  },
  { 
    text: "Where did you grow up?",
    tags: ["classic", "corporate"],
    quizText: "Where did <PLAYER> grow up?",
    fakeAnswers: [
      "Cleveland",
      "Twinsburg",
      "massachusetts",
      "new york"
    ]
  },
  { 
    text: "If you had to become a plant, which plant would you be?",
    tags: ["classic", "fun", "frp"],
    quizText: "If <PLAYER> had to become a plant, which plant would they be?",
    fakeAnswers: [
      "tree",
      "Old Tjikko or whatever",
      "grass on a football field",
      "a beautiful flower"
    ]
  },
  { 
    text: "What is the first thing you thought when you woke up this morning?",
    tags: ["fun", "frp"],
    quizText: "What is the first thing <PLAYER> thought when they woke up this morning?",
    fakeAnswers: [
      "I'm hungry",
      "I want to go back to sleep",
      "ughhhhhh",
      "Yay, another day"
    ]
  },
  { 
    text: "What is your favorite ice cream topping?",
    tags: ["classic", "classroom", "fun"],
    quizText: "What is <PLAYER>'s favorite ice cream topping?",
    fakeAnswers: [
      "oreos",
      "hot fudge",
      "sprinkles",
      "brownsies"
    ]
  },
  { 
    text: "What trivia category could you absolutely crush?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What trivia category could <PLAYER> absolutely crush?",
    fakeAnswers: [
      "US History",
      "Music",
      "Pop Ballads of the 1980s",
      "i don't know anything"
    ]
  },
  { 
    text: "What are you planning to eat next?",
    tags: ["classic", "fun", "frp"],
    quizText: "What is <PLAYER> planning to eat next?",
    fakeAnswers: [
      "dinner",
      "hot dog",
      "idk",
      "something good"
    ]
  },
  { 
    text: "If you had to become a supernatural creature, which creature would you choose?",
    tags: ["classic", "fun", "frp"],
    quizText: "If <PLAYER> had to become a supernatural creature, which creature would they choose?",
    fakeAnswers: [
      "vampire",
      "Alien",
      "a ghost but a cool one",
      "nothing"
    ]
  },
  { 
    text: "What non-alcoholic drink best represents you as a person?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What non-alcoholic drink best represents <PLAYER> as a person?",
    fakeAnswers: [
      "juice",
      "orange juice",
      "Cherry Cola",
      "MILK"
    ]
  },
  { 
    text: "What is the best bird?",
    tags: ["frp"],
    quizText: "According to <PLAYER>, what is the best bird?",
    fakeAnswers: [
      "im the biggest bird",
      "Big bird",
      "the atlanta hawks",
      "i have no idea"
    ]
  },
  { 
    text: "If you had vanity license plates, what would they say?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> had vanity license plates, what would they say?",
    fakeAnswers: [
      "IM GR8",
      "WOW DOGE",
      "idk something stupid",
      "2098432"
    ]
  },
  { 
    text: "What's something you think is underrated?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What's something <PLAYER> thinks is underrated?",
    fakeAnswers: [
      "Marvel Movies",
      "joe pera",
      "having fun",
      "living a boring life"
    ]
  },
  { 
    text: "What's something you think is overrated?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What's something <PLAYER> thinks is overrated?",
    fakeAnswers: [
      "Marvel Movies",
      "Hamilton the musical",
      "Paul Thomas Anderson movies",
      "nothing"
    ]
  },
  { 
    text: "What makes you feel grateful?",
    tags: ["classic", "corporate", "frp"],
    quizText: "What makes <PLAYER> feel grateful?",
    fakeAnswers: [
      "my family",
      "My job",
      "Everything around me",
      "pizza"
    ]
  },
  { 
    text: "What has made you smile recently?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What has made <PLAYER> smile recently?",
    fakeAnswers: [
      "Pizza",
      "my cat",
      "Spider-Man: Into the Spider-verse",
      "nothing"
    ]
  },
  { 
    text: "What possession is the most valuable to you?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What possession is the most valuable to <PLAYER>?",
    fakeAnswers: [
      "my phone",
      "idk",
      "my house",
      "My car"
    ]
  },
  { 
    text: "What's the worst advice you could ever give?",
    tags: ["fun", "frp"],
    quizText: "What's the worst advice <PLAYER> could ever give?",
    fakeAnswers: [
      "Don't quit your day job",
      "Invest in crypto",
      "Snakes are edible",
      "I don't know"
    ]
  },
  { 
    text: "What subject could you teach as a college professor?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What subject could <PLAYER> teach as a college professor?",
    fakeAnswers: [
      "the office trivia",
      "the simpsons trivia",
      "no subject",
      "World History"
    ]
  },
  { 
    text: "Where do you feel the most at home?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "Where does <PLAYER> feel the most at home?",
    fakeAnswers: [
      "at home",
      "everywhere I go",
      "in Paris, France",
      "Nowehere"
    ]
  },
  { 
    text: "What is the first concert you ever attended?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What is the first concert <PLAYER> ever attended?",
    fakeAnswers: [
      "Bruce Springsteen",
      "Blink-182",
      "Taylor Swift",
      "the red hot chili peppers"
    ]
  },
  { 
    text: "What is the best concert you ever attended?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What is the best concert <PLAYER> ever attended?",
    fakeAnswers: [
      "Bruce Springsteen",
      "Blink-182",
      "Taylor Swift",
      "the red hot chili peppers"
    ]
  },
  { 
    text: "What popular thing do you dislike the most?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What popular thing does <PLAYER> dislike the most?",
    fakeAnswers: [
      "MCU",
      "taylor swift",
      "new girl",
      "Barbie"
    ]
  },
  { 
    text: "What's an unpopular opinion you hold?",
    tags: ["fun", "frp"],
    quizText: "What's an unpopular opinion <PLAYER> holds?",
    fakeAnswers: [
      "life is good",
      "A.I. is nice",
      "NFTs are cool",
      "everything is good"
    ]
  },
  { 
    text: "If you did not have to sleep, how would you spend the extra eight hours?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> did not have to sleep, how would they spend the extra eight hours?",
    fakeAnswers: [
      "sleeping anyway",
      "writing hopefully",
      "slacking off",
      "Catching up on my watchlist"
    ]
  },
  { 
    text: "If you could describe your life as a movie, what genre would it be?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> could describe your life as a movie, what genre would it be?",
    fakeAnswers: [
      "horror",
      "Dramedy",
      "comedy",
      "western/romance"
    ]
  },
  { 
    text: "What is the least healthy thing you do?",
    tags: ["fun", "frp"],
    quizText: "What is the least healthy thing <PLAYER> does?",
    fakeAnswers: [
      "eat bad food",
      "sleep all the time",
      "drive my car",
      "nothing"
    ]
  },
  { 
    text: "What is the most healthy thing you do?",
    tags: ["fun", "corporate", "frp"],
    quizText: "What is the most healthy thing <PLAYER> does?",
    fakeAnswers: [
      "Run",
      "skateboarding",
      "exercise",
      "eating lots of brocolli"
    ]
  },
  { 
    text: "What current fact about you would most impress your five-year-old self?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What current fact about <PLAYER> would most impress their five-year-old self?",
    fakeAnswers: [
      "I have a job",
      "nothing",
      "I have friends",
      "idk"
    ]
  },
  { 
    text: "What is your favorite condiment or sauce?",
    tags: ["fun", "frp"],
    quizText: "What is <PLAYER>'s favorite condiment or sauce?",
    fakeAnswers: [
      "ketchup",
      "hot sauce",
      "BBQ",
      "idk"
    ]
  },
  { 
    text: "How would other people describe you?",
    tags: ["corporate", "frp"],
    quizText: "How does <PLAYER> think other people would describe them?",
    fakeAnswers: [
      "i do not know",
      "quiet",
      "loud",
      "fun"
    ]
  },
  { 
    text: "What question would you ask a psychic?",
    tags: ["fun", "frp"],
    quizText: "What question would <PLAYER> ask a psychic?",
    fakeAnswers: [
      "no question",
      "When will I die?",
      "What happens next?",
      "what are your rates?"
    ]
  },
  { 
    text: "What question would you ask someone to get to know them?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What question would <PLAYER> ask someone to get to know them?",
    fakeAnswers: [
      "How are you?",
      "this question",
      "What is your mother's maiden name?",
      "idk"
    ]
  },
  { 
    text: "What is the best present someone could bring you for a housewarming?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What is the best present someone could bring <PLAYER> for a housewarming?",
    fakeAnswers: [
      "an armani suit",
      "themselves",
      "a bottle of non-alcoholic wine",
      "nothing"
    ]
  },
  { 
    text: "What is something that never fails to bring you joy?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What is something that never fails to bring <PLAYER> joy?",
    fakeAnswers: [
      "nothing",
      "The SImpsons",
      "driving in my car",
      "my family"
    ]
  },
  { 
    text: "If you were a kitchen utensil, which one would you be?",
    tags: ["classic", "fun", "frp"],
    quizText: "If <PLAYER> were a kitchen utensil, which one would they be?",
    fakeAnswers: [
      "fork",
      "knife",
      "tongs",
      "spoon"
    ]
  },
  { 
    text: "If you wrote an autobiography, what would be the title?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "If <PLAYER> wrote an autobiography, what would be the title?",
    fakeAnswers: [
      "The Alan Partridge Story",
      "An Unfulfilling Life",
      "The Trials and Tribulations of Nance",
      "idk"
    ]
  },
  { 
    text: "What new habit would you most like to start?",
    tags: ["classic", "corporate", "fun", "frp"],
    quizText: "What new habit would <PLAYER> most like to start?",
    fakeAnswers: [
      "daily meditation",
      "working out",
      "social time",
      "idk"
    ]
  },
  { 
    text: "How are you feeling right now?",
    tags: ["fun", "frp"],
    quizText: "How is <PLAYER> feeling right now?",
    fakeAnswers: [
      "idk",
      "fine",
      "good",
      "bad"
    ]
  },
  { 
    text: "If you walked into a room with everyone you've ever met in it, who would you try to find?",
    tags: ["frp"],
    quizText: "If <PLAYER> walked into a room with everyone they'd ever met in it, who would they try to find?",
    fakeAnswers: [
      "my mom",
      "My dad",
      "my ex boy friend",
      "no one"
    ]
  },
  { 
    text: "What was your favorite breakfast as a kid?",
    tags: ["corporate", "frp"],
    quizText: "What was <PLAYER>'s favorite breakfast as a kid?",
    fakeAnswers: [
      "Cocoa puffs",
      "Reese's puffs",
      "bacon and eggs",
      "black coffee"
    ]
  },
  { 
    text: "What interests did you have as a child that you still have today?",
    tags: ["corporate", "fun", "frp"],
    quizText: "What interests did <PLAYER> have as a child that they still have today?",
    fakeAnswers: [
      "music",
      "painting",
      "Teenage Mutant Ninja Turtles",
      "nothing"
    ]
  },
  { 
    text: "What interests did you have as a child that you no longer have?",
    tags: ["frp"],
    quizText: "What interests did <PLAYER> have as a child that they no longer have?",
    fakeAnswers: [
      "idk",
      "nothing",
      "Teenage Mutant Ninja Turtles",
      "drawing comics"
    ]
  },
  { 
    text: "What cartoon would you most want to watch on a Saturday morning?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What cartoon would <PLAYER> most want to watch on a Saturday morning?",
    fakeAnswers: [
      "Batman",
      "spongebob",
      "fairly odd parents",
      "Arthur"
    ]
  },
  { 
    text: "What's a subject you think they should teach in school?",
    tags: ["classic", "classroom", "corporate", "fun", "frp"],
    quizText: "What's a subject <PLAYER> thinks they should teach in school?",
    fakeAnswers: [
      "doing taxes",
      "how to live",
      "how to vote",
      "idk"
    ]
  },
  {
    text: "What accomplishment makes you feel the most pride?",
    tags: ["classic", "corporate", "frp"],
    quizText: "What accomplishment makes <PLAYER> feel the most pride?",
    fakeAnswers: [
      "My family",
      "my gpa",
      "nothing",
      "everything im great"
    ]
  },
  {
    text: "Who is your favorite teacher?",
    tags: ["classroom"],
    quizText: "Who is <PLAYER>'s favorite teacher?",
    fakeAnswers: [
      "none",
      "mr. taylor",
      "ms bids",
    ]
  },
  {
    text: "What is your favorite book you've read in school?",
    tags: ["classroom"],
    quizText: "What is <PLAYER>'s favorite book they've read in school?",
    fakeAnswers: [
      "Hatchet",
      "Where the Red Fern Grows",
      "The Hunger Games",
    ]
  },
  {
    text: "What would you do if you didn't have to go to school?",
    tags: ["classroom"],
    quizText: "What would <PLAYER> do if they didn't have to go to school?",
    fakeAnswers: [
      "nothing",
      "sleep",
      "eat more",
    ]
  },
  {
    text: "If you could choose the uniform for your school, what would it be?",
    tags: ["classroom"],
    quizText: "If <PLAYER> could choose the uniform for their school, what would it be?",
    fakeAnswers: [
      "green shirt",
      "sweatpants",
      "no dress code",
    ]
  },
  {
    text: "What's your favorite extra-curricular activity?",
    tags: ["classroom"],
    quizText: "What's <PLAYER>'s favorite extra-curricular activity?",
    fakeAnswers: [
      "soccer",
      "coding",
      "none",
    ]
  },
  {
    text: "What did you do for your last birthday?",
    tags: ["classroom"],
    quizText: "What did <PLAYER> do for their last birthday?",
    fakeAnswers: [
      "soccer",
      "coding",
      "dave and busters",
    ]
  },
  {
    text: "What's one thing you would change if you were principal of your school?",
    tags: ["classroom"],
    quizText: "What's one thing <PLAYER> would change if they were principal of their school?",
    fakeAnswers: [
      "nothing",
      "mandatory fortnite",
      "all-day recess",
    ]
  },
  {
    text: "What's one thing you would do if you were an adult?",
    tags: ["classroom"],
    quizText: "What's one thing <PLAYER> would do if they were an adult?",
    fakeAnswers: [
      "nothing",
      "vote",
      "go to college",
    ]
  },
  {
    text: "How do you think life came to be?",
    tags: ["frp"],
    quizText: "How does <PLAYER> think life came to be?",
    fakeAnswers: ["The big bang", "evolution", "God created it", "i have literally no idea", "We are living in a simulation"]
  },
  {
    text: "What do you think happens when we die?",
    tags: ["frp"],
    quizText: "What does <PLAYER> think happens when we die?",
    fakeAnswers: ["depends", "nothing", "Reincarnation", "We become one with the universe"]
  },
  {
    text: "What separates art from entertainment?",
    tags: ["frp"],
    quizText: "According to <PLAYER>, what separates art from entertainment?",
    fakeAnswers: ["Nothing, all entertainment is art", "Intentionality", "entertainment focuses on profit", "art is meaningful"], 
  },
  {
    text: "What is the meaning of art?",
    tags: ["frp"],
    quizText: "According to <PLAYER>, what is the meaning of art?",
    fakeAnswers: [
      "to express emotions and evoke feelings",
      "Art is a reflection of society and culture",
      "there is no single meaning, it's subjective",
      "Exploration of the human experience",
    ],
  },
  
  {
    text: "What's one thing you wish you could say to someone, but haven't found the right moment?",
    tags: ["frp"],
    quizText: "What's one thing <PLAYER> wishes they could say to someone, but haven't found the right moment?",
    fakeAnswers: [
      "I love you",
      "I'm sorry for hurting you",
      "You inspire me",
      "Thank you for being there for me",
    ],
  },
  {
    text: "What's one thing that's troubling you right now?",
    tags: ["frp"],
    quizText: "What's one thing that's troubling <PLAYER> right now?",
    fakeAnswers: [
      "my career",
      "my self-esteem",
      "money",
      "if i will ever be happy",
    ],
  },
  {
    text: "If you could change the past, what would you alter?",
    tags: ["frp"],
    quizText: "If <PLAYER> could change the past, what would they alter?",
    fakeAnswers: ["No more WWII", "nothing", "invest in Nike", "remove colonialism"],
  }, 
  {
    text: "What has been the biggest turning point in your life?",
    tags: ["frp"],
    quizText: "What has been the biggest turning point in <PLAYER>'s life?",
    fakeAnswers: [
      "When I started high school",
      "when i moved away",
      "college graduation"
    ]
  },
  {
    text: "What is your mother's maiden name?",
    tags: ["frp"],
    quizText: "What is <PLAYER>'s mother's maiden name?",
    fakeAnswers: [
      "not telling",
      "idk",
      "n/a"
    ]
  },
  {
    text: "What is your social security number?",
    tags: ["frp"],
    quizText: "What is <PLAYER>'s social security number?",
    fakeAnswers: [
      "925-94-2039",
      "no",
      "not telling"
    ]
  },
  {
    text: "Which fruit best represents you as a person?",
    tags: ["frp", "fun"],
    quizText: "Which fruit best represents <PLAYER> as a person?",
    fakeAnswers: [
      "Pineapple",
      "banana",
      "Starfruit (im a star)",
      "Cocomelon"
    ]
  },
  {
    text: "a/s/l",
    tags: ["frp"],
    quizText: "How did <PLAYER> answer this question? 'a/s/l'",
    fakeAnswers: [
      "29,m,cleveland",
      "14/f/usa",
      "19 nb phillipines",
      "50000000000/nb/non-dimensional"
    ]
  },
  {
    text: "What would you say if you were trying to make someone laugh?",
    tags: ["frp", "fun"],
    quizText: "What would <PLAYER> say if they were trying to make someone laugh?",
    fakeAnswers: [
      "nothing",
      "idk",
      "i would just start laughing"
    ]
  },
  {
    text: "What is God?",
    tags: ["frp"],
    quizText: "According to <PLAYER>, what is God?",
    fakeAnswers: [
      "nothing",
      "idk",
      "everything"
    ]
  },
  {
    text: "If you found out you were living in a simulation, how would you try to escape?",
    tags: ["frp", "fun"],
    quizText: "If <PLAYER> found out they were living in a simulation, how would they try to escape?",
    fakeAnswers: [
      "i wouldnt'",
      "No",
      "Leave"
    ]
  },
  {
    text: "What's the weirdest movie you've ever seen?",
    quizText: "What's the weirdest movie <PLAYER> has ever seen?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "holy mountain",
      "never saw one"
    ],
  },
  {
    text: "What would be your elevator pitch to aliens for why they should abduct you?",
    quizText: "What would be <PLAYER>'s elevator pitch to aliens for why they should abduct them?",
    tags: ["frp", "fun"],
    fakeAnswers: [
      "idk",
      "nutrients",
      "please take me"
    ],
  },
  {
    text: "In your opinion, what's the funniest word in the English language?",
    quizText: "In <PLAYER>'s opinion, what's the funniest word in the English language?",
    tags: ["frp", "fun"],
    fakeAnswers: [
      "idk",
      "lol",
      "sop"
    ],
  },
  {
    text: "What's your hottest take?",
    quizText: "What's <PLAYER>'s hottest take?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "babies should vote",
      "over the garden wall? more like over the rated show"
    ],
  },
  {
    text: "If you were a sitcom character, what would be your catchphrase?",
    quizText: "If <PLAYER> were a sitcom character, what would be their catchphrase?",
    tags: ["frp", "fun"],
    fakeAnswers: [
      "idk",
      "ayyyy (fonz)",
      "If anyone needs me, i'll be in my room"
    ],
  },
  {
    text: "What's the most embarrassing thing you've ever done?",
    quizText: "What's the most embarrassing thing <PLAYER> has ever done?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "nothing",
      "every school dance"
    ],
  },
  {
    text: "How was your week?",
    quizText: "How was <PLAYER>'s week?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "fine",
      "not bad"
    ],
  },
  {
    text: "What's your least favorite shape of pasta?",
    quizText: "What's <PLAYER>'s least favorite shape of pasta?",
    tags: ["fun"],
    fakeAnswers: [
      "idk",
      "fusili",
      "spaghetti"
    ],
  },
  {
    text: "What was your last Halloween costume?",
    quizText: "What was <PLAYER>'s last Halloween costume?",
    tags: ["frp", "classroom", "classic", "fun"],
    fakeAnswers: [
      "none",
      "the bear",
      "barbarella"
    ],
  },
  {
    text: "How long can you hold your breath?",
    quizText: "How long can <PLAYER> hold their breath?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "0",
      "one second"
    ],
  },
  {
    text: "What is the biggest lie you have ever told?",
    quizText: "What is the biggest lie <PLAYER> has ever told?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "im actually italian",
      "never lied"
    ],
  },
  {
    text: "What matters?",
    quizText: "According to <PLAYER>, what matters?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "nothing",
      "everything"
    ],
  },
  {
    text: "What do you think about meditation?",
    quizText: "What does <PLAYER> think about meditation?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "nothing",
      "it is cool"
    ],
  },
  {
    text: "What is the last thing you lied about?",
    quizText: "What is the last thing <PLAYER> lied about?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "NOTOHING",
      "being happy"
    ],
  },
  {
    text: "What have you been hiding all those years?",
    quizText: "What has <PLAYER> been hiding all those years?",
    tags: ["deep"],
    fakeAnswers: [
      "idk",
      "nothing",
      "my shameful obsession with donuts"
    ],
  },
  {
    text: "What is the last thing you lied to your mom about?",
    quizText: "What is the last thing <PLAYER> lied to their mom about?",
    tags: ["deep"],
    fakeAnswers: [
      "idk",
      "nothing",
      "i brushed my teeth"
    ],
  },
  {
    text: "What's the biggest mistake you've made?",
    quizText: "What's the biggest mistake <PLAYER> has made?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "moving away",
      "going to college"
    ],
  },
  {
    text: "What is the worst pain you have ever been in?",
    quizText: "What is the worst pain <PLAYER> has ever been in?",
    tags: ["deep"],
    fakeAnswers: [
      "idk",
      "childbirth",
      "i hit my tooth on a rail"
    ],
  },
  {
    text: "What are you still trying to prove to yourself?",
    quizText: "What is <PLAYER> still trying to prove to themselves?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "i deserve love",
      "nothing"
    ],
  },
  {
    text: "What is your most defining personality trait?",
    quizText: "What is <PLAYER>'s most defining personality trait?",
    tags: ["frp", "corporate"],
    fakeAnswers: [
      "idk",
      "glasses",
      "coffee"
    ],
  },
  {
    text: "What is the hardest part about dating you?",
    quizText: "What does <PLAYER> think is the hardest part about dating them?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "nothing",
      "im emotionally unavailable!!"
    ],
  },
  {
    text: "What question are you trying to answer in your life right now?",
    quizText: "What question is <PLAYER> trying to answer in their life right now?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "where do i go",
      "what should i do"
    ],
  },
  {
    text: "What would you tell your younger self?",
    quizText: "What would <PLAYER> tell their younger self?",
    tags: ["frp", "corporate"],
    fakeAnswers: [
      "idk",
      "hi",
      "you will be happy"
    ],
  },
  {
    text: "When was the last time you cried?",
    quizText: "When was the last time <PLAYER> cried?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "neva cried",
      "two days ago"
    ],
  },
  {
    text: "What are you better at than most people you know?",
    quizText: "What is <PLAYER> better at than most people they know?",
    tags: ["frp", "fun"],
    fakeAnswers: [
      "idk",
      "guitar",
      "eating a lot of cookies"
    ],
  },
  {
    text: "What do you want to change in your personality right now?",
    quizText: "What does <PLAYER> want to change in their personality right now?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "nothing",
      "my emotional issues"
    ],
  },
  {
    text: "What are you afraid to admit?",
    quizText: "What is <PLAYER> afraid to admit?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "nothing",
      "i don't like th ebeach boys"
    ],
  },
  {
    text: "What is a skill or strength you possess that you feel is underutilized in your current role?",
    quizText: "What is a skill or strength <PLAYER> possesses that they feel is underutilized in their current role?",
    tags: ["corporate"],
    fakeAnswers: [
      "My attention to detail",
      "presentation skills",
      "Technical skills"
    ],
  },
  {
    text: "Reflecting on your career, what has been the most valuable lesson you've learned so far?",
    quizText: "Reflecting on their career, what has been the most valuable lesson <PLAYER> has learned so far?",
    tags: ["corporate"],
    fakeAnswers: [
      "Failure is a step to success",
      "Accept change",
      "Nothing"
    ],
  },
  {
    text: "What do you do to handle work-life balance and maintain well-being?",
    quizText: "What does <PLAYER> do to handle work-life balance and maintain well-being?",
    tags: ["corporate"],
    fakeAnswers: [
      "I don't",
      "Family always comes first",
      "I set boundaries"
    ],
  },
  {
    text: "What excites you most about the future?",
    quizText: "What excites <PLAYER> most about the future?",
    tags: ["frp", "corporate", "fun"],
    fakeAnswers: [
      "idk",
      "life",
      "my friends"
    ],
  },
  {
    text: "What is the most fun you've ever had?",
    quizText: "What is the most fun <PLAYER> has ever had?",
    tags: ["frp", "classroom", "classic"],
    fakeAnswers: [
      "idk",
      "being a kid at the beach",
      "cedar point 1998"
    ],
  },
  {
    text: "What do you think about all the time?",
    quizText: "What does <PLAYER> think about all the time?",
    tags: ["frp"],
    fakeAnswers: [
      "idk",
      "nothing",
      "everybody loves raymond"
    ],
  },
];

export default [...arr, ...gptQuestions, ...gptQuestions2];
