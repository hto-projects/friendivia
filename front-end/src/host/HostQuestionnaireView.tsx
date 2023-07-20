import * as React from "react";
import "../style.css";
import IPlayer from "back-end/interfaces/IPlayer";
import Paper from "@mui/material/Paper";
import { Socket } from "socket.io-client";

interface HostQuestionnaireViewProps {
  donePlayers: any;
  waitingPlayers: any;
  gameId: number;
  socket: Socket;
}

export default function HostQuestionnaireView(
  props: HostQuestionnaireViewProps
) {
  let waitingPlayers = props.waitingPlayers;
  let donePlayers = props.donePlayers;
  let socket = props.socket;

  async function onPlayerKick(name: string) {
    socket.emit("host-kick-player", name);
  }

  return (
    <>
      <div className="waiting">
        <div>
          <h1>Waiting on...</h1>
          <ul className="ul">
            {waitingPlayers.map((name: string, i: number) => (
              <li className="li" key={i}>
                <Paper
                  elevation={3}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      boxShadow: 8,
                      textDecoration: "line-through",
                    },
                  }}
                  onClick={() => onPlayerKick(name)}
                  className="playerbox"
                >
                  <p className="player">{name}</p>
                </Paper>
                <br />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>Done</h1>
          <ul className="ul">
            {donePlayers.map((name: string, i: number) => (
              <li className="li" key={i}>
                <Paper
                  elevation={3}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      boxShadow: 8,
                      textDecoration: "line-through",
                    },
                  }}
                  onClick={() => onPlayerKick(name)}
                  className="playerbox"
                >
                  <p className="player">{name}</p>
                </Paper>
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
