import * as React from "react";
import "../style.css";
import { Paper, Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";
import Speak from "../Speak";
import { pickOne } from "../util";

interface IShowAnswerProps {
  playerName: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  playerGuesses: Array<any>;
  socket: Socket;
  gameId: number;
  quizLength: number;
  handsFreeMode: boolean;
}

var currentQuizLength = 1;
export default function HostShowAnswer(props: IShowAnswerProps) {
  const {
    options,
    questionText,
    playerName,
    correctAnswerIndex,
    playerGuesses,
    socket,
    gameId,
    quizLength,
    handsFreeMode,
  } = props;

  function interpolatePlayerNameInQuestionText() {
    const [part1, part2] = questionText.split("<PLAYER>");
    return (
      <p className="showAnswer">
        {part1}
        <b>{playerName}</b>
        {part2}
      </p>
    );
  }

  socket.on("reset-quiz-length", resetQuizLength);

  function resetQuizLength() {
    currentQuizLength = 1;
  }

  function onNext() {
    if (currentQuizLength < quizLength) {
      currentQuizLength++;
      socket.emit("go-to-int-leaderboard", gameId);
    } else {
      socket.emit("next-question", gameId);
    }
  }

  function buttonText() {
    if (currentQuizLength < quizLength) return "Next Question";
    else return "Show Leaderboard";
  }

  function correctText() {
    var res = `The correct answer was "${options[correctAnswerIndex]}".`;
    var correctPlayers = playerGuesses.filter(
      (g) => g.guess === correctAnswerIndex
    );
    if (correctPlayers.length != 0) {
      const encourage = pickOne([
        "Nice guessing",
        "Good job",
        "Way to go",
        "Congrats",
      ]);
      res += `! ${encourage} `;
    } else {
      const sad = pickOne([
        "Unfortunately, no one received any points.",
        "I'm sorry, no points this round.",
        "No points this round. Please try to do better next time.",
      ]);
      res += `! ${sad}`;
    }

    correctPlayers.forEach((e) => {
      if (
        e.name === correctPlayers[correctPlayers.length - 1].name &&
        e.name !== correctPlayers[0].name
      ) {
        res += "and " + e.name + ".";
      } else {
        res += e.name + ", ";
      }
    });
    return res;
  }

  return (
    <>
      <Speak text={correctText()} cloud={true} />
      <div>
        {interpolatePlayerNameInQuestionText()}
        <div style={{ marginBottom: "2rem", marginTop: "2rem" }}></div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          {options.map((o: string, i: number) => (
            <div
              className="guesses"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  width: "95%",
                  height: "20vh",
                  padding: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    i === correctAnswerIndex
                      ? "linear-gradient(-45deg, cyan, magenta)"
                      : "white",
                  border: "2px solid purple",
                  borderRadius: "20px",
                }}
                key={i}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "Concert One",
                    color: i === correctAnswerIndex ? "white" : "black",
                    fontSize: "1.2em",
                    textAlign: "center",
                  }}
                >
                  {o}
                </p>
              </Paper>
              <Stack>
                {playerGuesses
                  .filter((g) => g.guess === i)
                  .map((g, j) => (
                    <>
                      <Paper
                        elevation={3}
                        className="lobby_player"
                        sx={{
                          background: "linear-gradient(-45deg, cyan, magenta)",
                          borderRadius: "20px",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "Concert One",
                            color: "White",
                            paddingTop: "3px",
                            paddingBottom: "3px",
                          }}
                        >
                          {g.name}
                        </p>
                      </Paper>
                      <div style={{ height: "0.4vh" }} />
                    </>
                  ))}
              </Stack>
            </div>
          ))}
        </div>
        <div>
          {!handsFreeMode && (
            <Button
              className="button"
              variant="contained"
              sx={{
                bgcolor: "#955EC3",
                m: 2,
                margin: "auto",
                marginTop: "2rem",
                fontFamily: "Concert One",
                textTransform: "none",
              }}
              onClick={onNext}
            >
              next question
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
