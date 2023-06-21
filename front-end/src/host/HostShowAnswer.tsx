import * as React from "react";
import "../style.css";
import { Paper, Stack } from "@mui/material";

interface IShowAnswerProps {
  playerName: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  playerGuesses: Array<any>;
}

export default function HostShowAnswer(props: IShowAnswerProps) {
  const {
    options,
    questionText,
    playerName,
    correctAnswerIndex,
    playerGuesses,
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
  function toUpperCaseArray(ArrayToCapital:Array<string>) {
    for (let i = 0; i < ArrayToCapital.length; i++) {
      ArrayToCapital[i] = ArrayToCapital [i].toUpperCase();
    }
    return ArrayToCapital;
  }
  return (
    <>
      {interpolatePlayerNameInQuestionText()}
      <div>
        {toUpperCaseArray(options).map((o: String, i: number) => (
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
    </>
  );
}
