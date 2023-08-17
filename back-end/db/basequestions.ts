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
    fakeAnswers: ["Indubitably", "Flabbergasted!", "Friendivia", "asymmetry"],
  },
  // {
  //   text: "What is your favorite emoji?",
  //   quizText: "What is <PLAYER>'s favorite emoji?",
  //   fakeAnswers: ["🦅", "poop emoji", "(。_。)", "🥱"],
  // },
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
      "Its power is overblown",
      "it is going to take over the world",
      "It will become a superintelligence and destroy us all",
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
  }
];

const gptQuestions2 = [
  {
    text: "What's your favorite meme?",
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
    quizText: "What's <PLAYER>'s favorite way to relax after a long day?",
    fakeAnswers: [
      "netflix and chill",
      "read book",
      "meditate",
      "drink tea",
    ],
  },
  {
    text: "If you could have a conversation with your pet, what's the first thing you'd ask?",
    quizText: "If <PLAYER> could talk to their pet, what's the first thing they'd ask?",
    fakeAnswers: [
      "how's your day, buddy?",
      "Where do you hide my socks?",
      "wats up",
      "What's the secret to happiness?",
    ],
  },
  {
    text: "What's a skill you'd love to master?",
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
    quizText: "According to <PLAYER>, what is the best bird?",
    fakeAnswers: [
      "im the biggest bird",
      "Big bird",
      "the atlanta hawks",
      "i have no idea"
    ]
  },
  { 
    text: "If you had vanity plates, what would they say?",
    quizText: "If <PLAYER> had vanity plates, what would they say?",
    fakeAnswers: [
      "IM GR8",
      "WOW DOGE",
      "idk something stupid",
      "2098432"
    ]
  },
  { 
    text: "What's something you think is underrated?",
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
    quizText: "How would other people describe <PLAYER>?",
    fakeAnswers: [
      "i do not know",
      "quiet",
      "loud",
      "fun"
    ]
  },
  { 
    text: "What question would you ask a psychic?",
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
    quizText: "What accomplishment makes <PLAYER> feel the most pride?",
    fakeAnswers: [
      "My family",
      "my gpa",
      "nothing",
      "everything im great"
    ]
  }
];

export default [...arr, ...gptQuestions, ...gptQuestions2];
