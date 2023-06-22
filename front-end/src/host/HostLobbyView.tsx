import * as React from "react";
import "../style.css";
import { Button, Paper } from "@mui/material";
import { Socket } from "socket.io-client";

interface ILobbyViewProps {
  playerNames: string[];
  gameId: number;
  socket: Socket;
}

export default function HostLobbyView(props: ILobbyViewProps) {
  const { playerNames, gameId, socket } = props;

  async function onStart() {
    console.log(
      getComputedStyle(document.documentElement).getPropertyValue("accent") +
        ";"
    );
    socket.emit("host-start", gameId);
  }

  return (
    <>
      <h2>Join at friendpardy.com</h2>
      <Paper elevation={3} className="gameid">
        <p className="id">{gameId}</p>
      </Paper>
      <h1>{playerNames.length} Players</h1>
      <div className="waiting">
        {playerNames.map((name: String, i: number) => (
          <>
            <Paper elevation={3} className="playerbox">
              <p className="player">{name}</p>
            </Paper>
            <br />
          </>
        ))}
      </div>
      <Button
        variant="contained"
        disabled={playerNames.length < 2}
        sx={{
          bgcolor:
            getComputedStyle(document.body).getPropertyValue("--accent") + ";",
        }}
        onClick={onStart}
      >
        Start
      </Button>
    </>
  );
}
