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
  const gameStr = gameId
    .toString()
    .split("")
    .join(", ");

  async function onStart() {
    socket.emit("host-start", gameId);
  }

  async function onPlayerKick(name: string) {
    socket.emit("host-kick-player", name);
  }

  function onSettings() {
    socket.emit("host-settings", gameId);
  }

  return (
    <div className="host-lobby">
      <Speak text={`Join at ${joinUrl}!! Use game I.D. ${gameStr}`} />
      <PlayAudio src={open} loop={false} />
      <div className="join-instructions">
        <div className="join-instruction-edge">
          <h2>Join at <span style={{"fontSize": "4vw", "color": "white"}}>{joinUrl}</span></h2>
        </div>
          <Paper elevation={3} className="gameid">
            <p className="label">Game ID</p>
            <p className="id">{gameId}</p>
          </Paper>
        <div className="join-instruction-edge">
          <Button
            variant="contained"
            disabled={playerNames.length < 2}
            sx={{
              fontSize: "2em",
              width: "90%",
              bgcolor: getComputedStyle(document.body).getPropertyValue("--accent"),
            }}
            onClick={onStart}
          >
            Start
          </Button>
        </div>
      </div>
      <div className="joined-players">
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
      </div>
      <div className="lobby-bottom-bar">
        <Button
          className="LobbySettings"
          variant="contained"
          onClick={onSettings}
        >
          Game Settings
        </Button>
        <Button
          className="LobbyAbout"
          variant="contained"
          href="/about"
        >
          About
        </Button>
      </div>
    </div>
  );
}
