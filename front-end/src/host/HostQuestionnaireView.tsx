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
    }, 20000);
  }, [warningReached, setWarningReached]);

  React.useEffect(() => {
    setTimeout(() => {
      setWarning2Reached(true);
    }, 40000);
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
      {waitingPlayers.length === 1 && (
        <Speak text={`It all comes down to you, ${waitingPlayers[0]}.`} />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            marginTop: "4vh",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              background: "linear-gradient(135deg, #F6C3C9, #EED1CC)",
              borderRadius: "12px",
              padding: "1vw",
              margin: "auto",
              mx: "auto",
              width: "46vw",
              height: "75vh",
            }}
          >
            <h1 style={{ color: "white", fontFamily: "Concert One" }}>
              waiting on
            </h1>
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
                      background: "linear-gradient(-45deg, cyan, magenta)",
                      borderRadius: "20px",
                      width: "10vw",
                      margin: "auto",
                    }}
                    onClick={() => onPlayerKick(name)}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "Concert One",
                        color: "White",
                        paddingTop: "3px",
                        paddingBottom: "3px",
                      }}
                    >
                      {name}
                    </p>
                  </Paper>
                  <br />
                </li>
              ))}
            </ul>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            marginTop: "4vh",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              background: "linear-gradient(135deg, #A8E6CF, #C2E9E4)",
              borderRadius: "12px",
              padding: "1vw",
              margin: "auto",
              mx: "auto",
              width: "46vw",
              height: "75vh",
            }}
          >
            <h1 style={{ color: "white", fontFamily: "Concert One" }}>done</h1>
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
                      background: "linear-gradient(-45deg, cyan, magenta)",
                      borderRadius: "20px",
                      width: "10vw",
                      margin: "auto",
                    }}
                    className="playerbox"
                    onClick={() => onPlayerKick(name)}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "Concert One",
                        color: "White",
                        paddingTop: "3px",
                        paddingBottom: "3px",
                      }}
                    >
                      {name}
                    </p>
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
