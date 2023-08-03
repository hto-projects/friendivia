import * as React from "react";
import "../style.css";
import IPlayer from "back-end/interfaces/IPlayer";
import Paper from "@mui/material/Paper";
import { Socket } from "socket.io-client";
import Speak from "../Speak";

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
  const [warningReached, setWarningReached] = React.useState(false);
  let spokenText = "";

  const [warning2Reached, setWarning2Reached] = React.useState(false);
  let spokenText2 = "";

  React.useEffect(() => {
    setTimeout(() => {
      setWarningReached(true);
    }, 20000)
  }, [warningReached, setWarningReached]);

  React.useEffect(() => {
    setTimeout(() => {
      setWarning2Reached(true);
    }, 40000)
  }, [warning2Reached, setWarning2Reached]);

  async function onPlayerKick(name: string) {
    if (waitingPlayers.length + donePlayers.length > 2) {
      socket.emit("host-kick-player", name);
    } else {
      alert("You need at least 2 players to play!");
    }
  }

  if (warningReached && waitingPlayers.length > 0) {
    spokenText = `Looks like we're still waiting on "${waitingPlayers[0]}". Please complete your questionnaire in a timely fashion.`;
  }

  if (warning2Reached && waitingPlayers.length > 1) {
    spokenText = `Don't worry, "${waitingPlayers[1]}". You still have time.`;
  }

  return (
    <>
    {spokenText && <Speak text={spokenText} />}
    {spokenText2 && <Speak text={spokenText2} />}
    {waitingPlayers.length === 1 && <Speak text={`It all comes down to you, ${waitingPlayers[0]}.`} />}
      <div className="waiting">
        <div className="waitingPlayers">
          <Paper
            elevation={3}
            sx={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              paddingLeft: "1vw",
              paddingRight: "1vw",
              margin: "auto",
              width: "18vw",
            }}
          >
            <h1 style={{ color: "white" }}>Waiting on</h1>
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
                      color: "red",
                      width: "10vw",
                      paddingTop: "0.1vh",
                      paddingBottom: "0.1vh",
                      margin: "auto",
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
          </Paper>
        </div>
        <div className="donePlayers">
          <Paper
            elevation={3}
            sx={{
              background: "linear-gradient(45deg, #61ed87 30%, #C7E5E2 100%)",
              paddingLeft: "1vw",
              paddingRight: "1vw",
              margin: "auto",
              width: "18vw",
            }}
          >
            <h1 style={{ color: "white" }}>Done</h1>
            <ul className="ul">
              {donePlayers.map((name: string, i: number) => (
                <li className="li" key={i}>
                  {i === 0 && <Speak text={`Thank you, ${name}.`} />}
                  <Paper
                    elevation={3}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        boxShadow: 8,
                        textDecoration: "line-through",
                      },
                      color: "red",
                      width: "10vw",
                      paddingTop: "0.1vh",
                      paddingBottom: "0.1vh",
                      margin: "auto",
                    }}
                    className="playerbox"
                    onClick={() => onPlayerKick(name)}
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
