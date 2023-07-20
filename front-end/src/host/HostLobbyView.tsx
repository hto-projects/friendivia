import React from "react";
import "../style.css";
import { Button, Paper } from "@mui/material";
import { Socket } from "socket.io-client";
import Speak from "../Speak";
import open from "../assets/audio/appopen.mp3";
import PlayAudio from "../PlayAudio";

interface ILobbyViewProps {
  playerNames: string[];
  gameId: number;
  socket: Socket;
}

export default function HostLobbyView(props: ILobbyViewProps) {
  const { playerNames, gameId, socket } = props;

  const joinUrl = window.location.href
    .replace("/host", "")
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "");
  const joinMessage = `Join at ${joinUrl}`;
  const textToSpeak = `Welcome to frenperdy! ${joinMessage}`;
  const gameStr = gameId
    .toString()
    .split("")
    .join(" ");
  console.log(gameId, gameStr);

  async function onStart() {
    socket.emit("host-start", gameId);
  }

  async function onPlayerKick(name: string) {
    socket.emit("host-kick-player", name);
  }

  return (
    <>
      <Speak text={joinMessage + ". Use code: " + gameStr} />
      <PlayAudio src={open} loop={false} />
      <h2>
        Join at
        {" " +
          window.location.href
            .replace("/host", "")
            .replace("http://", "")
            .replace("https://", "")
            .replace("www.", "")}
      </h2>
      <Paper elevation={3} className="gameid">
        <p className="id">{gameId}</p>
      </Paper>
      <h1>{playerNames.length} Players</h1>
      <div className="player-list">
        {playerNames.map((name: string, i: number) => (
          <Paper
            key={i}
            elevation={3}
            className="lobby_player"
            sx={{
              "&:hover": {
                cursor: "pointer",
                boxShadow: 8,
                textDecoration: "line-through",
              },
            }}
            onClick={() => onPlayerKick(name)}
          >
            <p className="player">{name}</p>
          </Paper>
        ))}
      </div>
      <Button
        variant="contained"
        disabled={playerNames.length < 2}
        style={{ marginTop: "5vh" }}
        sx={{
          bgcolor: getComputedStyle(document.body).getPropertyValue("--accent"),
        }}
        onClick={onStart}
      >
        Start
      </Button>
    </>
  );
}
