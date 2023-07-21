import * as React from "react";
import "../style.css";
import { Paper, Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";

interface IShowAnswerProps {
  playerName: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  playerGuesses: Array<any>;
  socket: Socket;
  gameId: number;
  quizLength: number;
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
    if (currentQuizLength < quizLength) return "Next Question";
    else return "Show Leaderboard";
  }

  return (
    <>
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
          {options.map((o: String, i: number) => (
            <>
              <div className="guesses">
                <Paper
                  style={{
                    background:
                      i === correctAnswerIndex
                        ? "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
                        : "white",
                    boxShadow: i === correctAnswerIndex ? "0 0 10px green" : "",
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
                              getComputedStyle(document.body).getPropertyValue(
                                "--accent"
                              ) + ";",
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
          ))}
        </div>
        <div>
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
            {buttonText() == "Next Question"
              ? "Next Question"
              : "Show Leaderboard"}
          </Button>
        </div>
      </div>
    </>
  );
}
