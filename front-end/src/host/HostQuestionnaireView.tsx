import * as React from "react";
import "../style.css";
import IPlayer from "back-end/interfaces/IPlayer";
import Paper from "@mui/material/Paper";
import { Socket } from "socket.io-client";

export default function HostQuestionnaire(props) {
  const waitingPlayers = ["Tyler", "James"];
  const donePlayers = ["Bob", "Tim", "Drew"];

  return (
    <>
      <div className="waiting">
        <div>
          <h1>Waiting on...</h1>
          <ul className="ul">
            {waitingPlayers.map((name: String, i: number) => (
              <li className="li" key={i}>
                <Paper elevation={3} className="playerbox">
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
            {donePlayers.map((name: String, i: number) => (
              <li className="li" key={i}>
                <Paper elevation={3} className="playerbox">
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
