import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
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
      <h1>Game Code</h1>
      <p className="gameid">{gameId}</p>
      <h1>Players</h1>
      <ul>
        {playerNames.map((name: String, i: number) => (
          <li key={i}>
            <h1 className="players">{name}</h1>
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
