import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";
import PlayerWait from "./PlayerWait";

interface IQuizQuestionViewProps {
  optionsList: string[];
  socket: Socket;
  playerState: {
    state: string;
    message: string;
  };
}

export default function PlayerQuizQuestionView(props: IQuizQuestionViewProps) {
  const { optionsList, socket, playerState } = props;

  const guessReceivedMessage = `Guess received! Hang tight...`;

  function goTo(answerIndex: number) {
    answerQuestion(answerIndex);
    allPlayersAnswerQuestion(answerIndex);
  }

  const answerQuestion = async (answerIndex: number): Promise<void> => {
    socket.emit("player-answer-question", answerIndex);
  };

  const allPlayersAnswerQuestion = async (
    answerIndex: number
  ): Promise<void> => {
    socket.emit("check-all-players-answered", answerIndex);
  };

  const optionsForm = (
    <div>
      <div className="answerOptions">
        {optionsList.map((o: String, i: number) => (
          <>
            <br />
            <Button
              style={{ textTransform: "none" }}
              className="answerButton"
              variant="contained"
              sx={{
                bgcolor:
                  getComputedStyle(document.body).getPropertyValue("--accent") +
                  ";",
                fontSize: "1.2em",
                textTransform: "none",
                fontFamily: "Concert One",
                width: "90%",
                height: "17vh",
                background:
                  "linear-gradient(-45deg, rgba(0, 200, 200, 0.7), rgba(200, 0, 200, 0.7))",
                border: "2px solid black",
              }}
              key={i}
              onClick={() => goTo(i)}
            >
              {o}
            </Button>
          </>
        ))}
      </div>

      <p style={{ color: "red" }}>{playerState.message}</p>
    </div>
  );

  if (playerState.state === "answered-quiz-question-waiting") {
    return <PlayerWait message={guessReceivedMessage} />;
  } else if (playerState.state === "question-being-read") {
    return <PlayerWait message="Get ready to answer..." />;
  } else {
    return optionsForm;
  }
}
