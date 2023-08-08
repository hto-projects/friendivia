# Friendivia Gameplay
How well do you know your friends? In this friends trivia game (not Friends the tv show), you'll start by answering a few questions about yourself. Then, you'll try to answer some questions about your friends, while they try to answer questions about you! You will be rewarded if you know your friends well. You will also be rewarded if your friends know *you* well.

## Game
There are two phases in this game.

### Phase 1
Each player answers a questionnaire about themselves. A quiz is generated based on the answers.

### Phase 2
The players take the quiz. A player gets two points for every question they answer correctly. For a question regarding the player themselves, they are not allowed to answer. However, they get one point for each correct answer from another player.

## Host
domain.com/host

### Host States
- Init (No game is being played)
- Lobby (Waiting for players to join the game)
- Questionnaire (Waiting for players to complete the questionnaire)
- Viewing Question (Waiting for players to answer question)
- Viewing Answer (Showing the answer (timed))
- Game Over (Showing the winner)
- Inactive (The game is not being played)

## Player
domain.com

### Player States
- Init (Player has not joined a game)
- Joined Waiting (Player has entered the game, waiting for it to start)
- Filling Questionnaire (Player is in the process of completing the questionnaire)
- Done with Questionnaire Waiting (Player has completed the questionnaire, waiting for phase 2)
- Viewing Question (Player has to answer a question)
  - A player is not allowed to answer a question regarding themselves
- Waiting for Answer (Player has answered (or the question is about them), and is waiting for the answer to be revealed)
- Game over (That's it)
