import * as React from "react";
import "../style.css";
import crown from "../assets/crown.png";
import { Button } from "@mui/material";

interface ILeaderBoardProps {
  playerScores: Array<any>;
  socket: any;
}

export default function HostLeaderBoard(props: ILeaderBoardProps) {
  const socket = props.socket;
  const playerScores = props.playerScores;
  playerScores.sort((p1, p2) => p1.score - p2.score);

  function onPlayAgain() {
    socket.emit("play-again");
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ alignSelf: "center", margin: "auto" }}>Leaderboard</h1>
        <br />
        <img src={crown} style={{ width: "8vw" }} />
        {playerScores.map((ps, i) => (
          <div>
            <p className="participant">
              {ps.name} | {ps.score}
            </p>
            <br />
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        sx={{
          bgcolor:
            getComputedStyle(document.body).getPropertyValue("--accent") + ";",
        }}
        onClick={onPlayAgain}
      >
        Play again
      </Button>
    </>
  );
}
