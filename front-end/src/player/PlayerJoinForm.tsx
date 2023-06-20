import * as React from "react";
import "../style.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Socket } from "socket.io-client";
import PlayerWait from "./PlayerWait";
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

interface IJoinFormProps {
  socket: Socket;
  playerState: any;
}

export default function PlayerJoinForm(props: IJoinFormProps) {
  const [name, setName] = React.useState("");
  const [gameId, setGameId] = React.useState<number>(0);
  const inMessage = `You're in! Please wait for the game to begin.` + "\n";

  const { socket, playerState } = props;

  function onSubmitJoin() {
    socket.emit("player-submit-join", { name, gameId });
  }

  const joinInputs = (
    <>
      <p>Enter your name to join the game:</p>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        size="small"
        value={name}
        inputProps={{ maxLength: 10 }}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="game-id"
        label="Game ID"
        variant="outlined"
        size="small"
        type="number"
        value={gameId || ""}
        onChange={(e) => setGameId(Number(e.target.value))}
      />
      <Button
        disabled={!name || !gameId}
        variant="contained"
        sx={{ bgcolor: "#757de8;" }}
        onClick={onSubmitJoin}
      >
        Join
      </Button>
      <p style={{ color: "red" }}>{playerState.message}</p>
    </>
  );

  return playerState.state === "joined-waiting" ? (
    <PlayerWait message={inMessage} />
  ) : (
    joinInputs
  );
}
