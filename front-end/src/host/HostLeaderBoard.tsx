import * as React from "react";
import "../style.css";
import crown from "../assets/crown.png";
import { Button } from "@mui/material";
import Speak from "../Speak";

interface ILeaderBoardProps {
  playerScores: Array<any>;
  socket: any;
}

export default function HostLeaderBoard(props: ILeaderBoardProps) {
  const socket = props.socket;
  const playerScores = props.playerScores;
  playerScores.sort((p1, p2) => p2.score - p1.score);

  function onPlayAgain() {
    socket.emit("play-again");
  }

  function winnerText() {
    const winnerScore = playerScores[0].score;
    const winnerName = playerScores[0].name;
    return `The winner is "${winnerName}" with a score of "${winnerScore}"! Great job!`;
  }

  return (
    <>
      <Speak text={winnerText()} cloud={true} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Leaderboard</h1>
        <img
          src={crown}
          alt="Crown"
          style={{ width: "8vw", paddingBottom: "1vh", paddingTop: "1vh" }}
        />
        <div className="leaderboard">
          {playerScores.map((ps, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: i < 9 ? "-15px" : "-20px",
                width: "100%",
              }}
            >
              <span
                className="participant"
                style={{
                  fontSize: i === 0 ? "26px" : "16px",
                  fontWeight: i === 0 ? "bold" : "normal",
                  background:
                    i === 0
                      ? "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)"
                      : "#757de8",
                  boxShadow: i === 0 ? "0 0 10px #FFD700" : "none",
                }}
              >
                {ps.name}
              </span>
              <span
                className="score"
                style={{
                  marginLeft: "-4px",
                  minWidth: "50px",
                  fontSize: i === 0 ? "26px" : "16px",
                  fontWeight: i === 0 ? "bold" : "normal",
                  background:
                    i === 0
                      ? "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)"
                      : "#757de8",
                  boxShadow: i === 0 ? "0 0 10px #FFD700" : "none",
                }}
              >
                {ps.score}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="contained"
        sx={{
          bgcolor:
            getComputedStyle(document.body).getPropertyValue("--accent") + ";",
          margin: "16px auto",
        }}
        onClick={onPlayAgain}
      >
        Play again
      </Button>
    </>
  );
}
