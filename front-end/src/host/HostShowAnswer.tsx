import * as React from "react";
import "../style.css";
import { Paper, Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";
import Speak from "../Speak";

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

  function onNext() {
    if (currentQuizLength < quizLength) {
      currentQuizLength++;
      socket.emit("go-to-int-leaderboard", gameId);
    } else {
      socket.emit("next-question", gameId);
    }
  }

  function buttonText() {
    if (currentQuizLength < quizLength) {
      return "Next Question";
    } else if (questionText.includes("rather")) return "Show Leaderboard";
    else return "Next Round";
  }

  function correctText() {
    var res = `The correct answer was "${options[correctAnswerIndex]}".`;
    var correctPlayers = playerGuesses.filter(
      (g) => g.guess === correctAnswerIndex
    );
    if (correctPlayers.length != 0) res += "! Nice guessing ";
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
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignSelf: "center",
            marginBottom: "4vh",
          }}
        >
          <Paper
            style={{
              width: "auto",
              height: "5vh",
              margin: "auto",
              paddingLeft: "1vw",
              paddingRight: "1vw",
              display: "flex",
              alignContent: "center",
            }}
          >
            <p style={{ alignSelf: "center" }}>
              {playerGuesses.filter((g) => g.guess === correctAnswerIndex)
                .length *
                100 +
                " "}
              points for {playerName}
            </p>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "80vw",
            alignContent: "center",
            alignSelf: "center",
            margin: "auto",
          }}
        >
          {options.length === 2 ? (
            <>
              {" "}
              {options.map((o: String, i: number) => (
                <>
                  <div className="guesses">
                    <Paper
                      style={{
                        background:
                          i === correctAnswerIndex
                            ? "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
                            : i === 0
                            ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                            : "linear-gradient(45deg, #00008B 30%, #ADD8E6 90%)",
                        boxShadow:
                          i === correctAnswerIndex ? "0 0 10px green" : "",
                        color: i === correctAnswerIndex ? "white" : "white",
                        width: "35vw",
                        height: "40vh",
                        margin: "auto",
                        paddingTop: "0.1vh",
                        paddingBottom: "0.1vh",
                        marginRight: "1vw",
                        marginLeft: "1vw",
                        display: "flex",
                        verticalAlign: "middle",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <p
                        style={{
                          color: i === correctAnswerIndex ? "white" : "white",
                          fontWeight:
                            i === correctAnswerIndex ? "bolder" : "normal",
                          fontSize: "2rem",
                          alignSelf: "center",
                          textAlign: "center",
                          margin: "auto",
                        }}
                      >
                        {o}
                      </p>
                      {i === correctAnswerIndex ? (
                        <Paper
                          style={{
                            width: "20%",
                            padding: "0px",
                            marginLeft: "27vw",
                            marginBottom: "0.5vh",
                          }}
                        >
                          <p style={{ padding: "0px" }}>+200</p>
                        </Paper>
                      ) : (
                        <></>
                      )}
                    </Paper>
                    <Stack
                      style={{
                        backgroundColor:
                          getComputedStyle(document.body).getPropertyValue(
                            "--accent"
                          ) + ";",
                      }}
                    >
                      {playerGuesses
                        .filter((g) => g.guess === i)
                        .map((g, j) => (
                          <>
                            <Paper
                              sx={{
                                backgroundColor:
                                  getComputedStyle(
                                    document.body
                                  ).getPropertyValue("--accent") + ";",
                                width: "10vw",
                                paddingTop: "0.1vh",
                                paddingBottom: "0.1vh",
                                margin: "auto",
                              }}
                            >
                              <p
                                style={{
                                  background:
                                    getComputedStyle(
                                      document.body
                                    ).getPropertyValue("--accent") + ";",
                                  color: "white",
                                  fontWeight: "bolder",
                                  alignSelf: "center",
                                  verticalAlign: "middle",
                                  margin: "auto",
                                }}
                                key={j}
                              >
                                {g.name}
                              </p>
                            </Paper>
                            <div style={{ height: "0.4vh" }} />
                          </>
                        ))}
                    </Stack>
                    <br />
                  </div>
                </>
              ))}{" "}
            </>
          ) : (
            <>
              {" "}
              {options.map((o: String, i: number) => (
                <>
                  <div className="guesses">
                    <Paper
                      style={{
                        background:
                          i === correctAnswerIndex
                            ? "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
                            : "white",
                        boxShadow:
                          i === correctAnswerIndex ? "0 0 10px green" : "",
                        color: i === correctAnswerIndex ? "white" : "black",
                        width: "30vw",
                        margin: "auto",
                        paddingTop: "0.1vh",
                        paddingBottom: "0.1vh",
                        height: "11vh",
                      }}
                    >
                      <p
                        style={{
                          color: i === correctAnswerIndex ? "white" : "black",
                          fontWeight:
                            i === correctAnswerIndex ? "bolder" : "normal",
                          fontSize: "1.5rem",
                        }}
                      >
                        {o}
                      </p>
                      {i === correctAnswerIndex ? (
                        <Paper
                          style={{
                            width: "20%",
                            padding: "0px",
                            marginLeft: "23.5vw",
                            marginTop: "-2.5vh",
                          }}
                        >
                          <p style={{ padding: "0px" }}>+200</p>
                        </Paper>
                      ) : (
                        <></>
                      )}
                    </Paper>
                    <Stack
                      style={{
                        backgroundColor:
                          getComputedStyle(document.body).getPropertyValue(
                            "--accent"
                          ) + ";",
                      }}
                    >
                      {playerGuesses
                        .filter((g) => g.guess === i)
                        .map((g, j) => (
                          <>
                            <Paper
                              sx={{
                                backgroundColor:
                                  getComputedStyle(
                                    document.body
                                  ).getPropertyValue("--accent") + ";",
                                width: "10vw",
                                paddingTop: "0.1vh",
                                paddingBottom: "0.1vh",
                                margin: "auto",
                              }}
                            >
                              <p
                                style={{
                                  background:
                                    getComputedStyle(
                                      document.body
                                    ).getPropertyValue("--accent") + ";",
                                  color: "white",
                                  fontWeight: "bolder",
                                  alignSelf: "center",
                                  verticalAlign: "middle",
                                  margin: "auto",
                                }}
                                key={j}
                              >
                                {g.name}
                              </p>
                            </Paper>
                            <div style={{ height: "0.4vh" }} />
                          </>
                        ))}
                    </Stack>
                    <br />
                  </div>
                </>
              ))}{" "}
            </>
          )}
        </div>
        <div>
          {!handsFreeMode ? (
            <Button
              className="button"
              variant="contained"
              sx={{
                bgcolor:
                  getComputedStyle(document.body).getPropertyValue("--accent") +
                  ";",
                m: 2,
              }}
              onClick={onNext}
            >
              {buttonText()}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
