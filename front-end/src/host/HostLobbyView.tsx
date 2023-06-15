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
    socket.emit("host-start", gameId);
  }

  return (
    <>
      <h2>Join at friendpardy.com</h2>
      <Paper elevation={3} className="gameid">
        {gameId}
      </Paper>
      <h1>Players</h1>
      <ul className="ul">
        {playerNames.map((name: String, i: number) => (
          <li key={i}>
            <Paper elevation={3} className="playerbox">
              <p className="player">{name}</p>
            </Paper>
            <br />
          </li>
        ))}
      </ul>
      <Button
        variant="contained"
        sx={{ bgcolor: "#757de8;" }}
        onClick={onStart}
      >
        Start
      </Button>
    </>
  );
}
