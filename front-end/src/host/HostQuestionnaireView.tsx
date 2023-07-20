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

  return (
    <>
      <div className="waiting">
        <div className="waitingPlayers">
          <Paper
            elevation={3}
            sx={{
              //background: "#ff6257;",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              paddingLeft: "1vw",
              paddingRight: "1vw",
              margin: "auto",
              width: "18vw",
            }}
          >
            <h1 style={{ color: "white" }}>Waiting on</h1>
            <ul className="ul">
              {waitingPlayers.map((name: String, i: number) => (
                <li className="li" key={i}>
                  <Paper
                    elevation={3}
                    sx={{
                      color: "red",
                      width: "10vw",
                      paddingTop: "0.1vh",
                      paddingBottom: "0.1vh",
                      margin: "auto",
                    }}
                    className="playerbox"
                  >
                    <p className="player">{name}</p>
                  </Paper>
                  <br />
                </li>
              ))}
            </ul>
          </Paper>
        </div>
        <div className="donePlayers">
          <Paper
            elevation={3}
            sx={{
              //background: "#61ed87;",
              //like this but with greens background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              //background: "linear-gradient(45deg, #61ed87 30%, #2bb550 90%)",
              //reverse that gradient
              background: "linear-gradient(45deg, #61ed87 30%, #C7E5E2 100%)",
              paddingLeft: "1vw",
              paddingRight: "1vw",
              margin: "auto",
              width: "18vw",
            }}
          >
            <h1 style={{ color: "white" }}>Done</h1>
            <ul className="ul">
              {donePlayers.map((name: String, i: number) => (
                <li className="li" key={i}>
                  <Paper
                    elevation={3}
                    sx={{
                      color: "red",
                      width: "10vw",
                      paddingTop: "0.1vh",
                      paddingBottom: "0.1vh",
                      margin: "auto",
                    }}
                    className="playerbox"
                  >
                    <p className="player">{name}</p>
                  </Paper>
                  <br />
                </li>
              ))}
            </ul>
          </Paper>
        </div>
      </div>
    </>
  );
}
