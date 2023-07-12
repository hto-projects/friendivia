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

var num = 1;
export default function HostShowAnswer(props: IShowAnswerProps) {
  const {
    options,
    questionText,
    playerName,
    correctAnswerIndex,
    playerGuesses,
    socket,
    gameId, 
    quizLength
  } = props;

  function interpolatePlayerNameInQuestionText() {
    const [part1, part2] = questionText.split("<PLAYER>");
    return (
      <p>
        {part1}
        <b>{playerName}</b>
        {part2}
      </p>
    );
  }

  function onNext() {
    num++;
    socket.emit('next-question', gameId);
  }

  function buttonText(){
    if(num < quizLength)
      return "Next Question";
    else 
      return "Show Leaderboard";
  }

  if(buttonText() == "Next Question")
  return (
    <>
      {interpolatePlayerNameInQuestionText()}
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
                  color: i === correctAnswerIndex ? "white" : "black",
                  width: "30vw",
                  margin: "auto",
                  paddingTop: "0.1vh",
                  paddingBottom: "0.1vh",
                }}
              >
                <p
                  style={{
                    color: i === correctAnswerIndex ? "white" : "black",
                    fontWeight: i === correctAnswerIndex ? "bolder" : "normal",
                    fontSize: "1.5rem",
                  }}
                >
                  {o}
                </p>
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
                              getComputedStyle(document.body).getPropertyValue(
                                "--accent"
                              ) + ";",
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
          Next Question
        </Button>
      </div>
    </>
  )
  else
  return (
    <>
      {interpolatePlayerNameInQuestionText()}
      <div>
        {options.map((o: String, i: number) => (
          <>
            <div className="guesses">
              <Paper
                style={{
                  background:
                    i === correctAnswerIndex
                      ? "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
                      : "white",
                  color: i === correctAnswerIndex ? "white" : "black",
                  width: "30vw",
                  margin: "auto",
                  paddingTop: "0.1vh",
                  paddingBottom: "0.1vh",
                }}
              >
                <p
                  style={{
                    color: i === correctAnswerIndex ? "white" : "black",
                    fontWeight: i === correctAnswerIndex ? "bolder" : "normal",
                    fontSize: "1.5rem",
                  }}
                >
                  {o}
                </p>
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
                          margin: "auto",
                        }}
                      >
                        <p
                          style={{
                            background:
                              getComputedStyle(document.body).getPropertyValue(
                                "--accent"
                              ) + ";",
                            color: "white",
                            fontWeight: "bolder",
                          }}
                          key={j}
                        >
                          {g.name}
                        </p>
                      </Paper>
                      <br />
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
          Show Leaderboard
        </Button>
      </div>
    </>
  )
}
