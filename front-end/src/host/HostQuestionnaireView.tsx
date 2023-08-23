import * as React from "react";
import "../style.css";
import IPlayer from "back-end/interfaces/IPlayer";
import Paper from "@mui/material/Paper";
import { Socket } from "socket.io-client";
import Speak from "../Speak";
import { Button } from "../extra/FrdvButton";
import PlayerBadge from "./PlayerBadge";

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

  const [warning3Reached, setWarning3Reached] = React.useState(false);
  let spokenText3= "";

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

  React.useEffect(() => {
    setTimeout(() => {
      setWarning3Reached(true);
    }, 60000);
  }, [warning3Reached, setWarning3Reached]);

  async function onPlayerKick(name: string) {
    if (waitingPlayers.length + donePlayers.length > 2) {
      socket.emit("host-kick-player", name);
    } else {
      alert("You need at least 2 players to play!");
    }
  }

  if (warningReached && waitingPlayers.length > 0) {
    spokenText = `Hurry up, "${waitingPlayers[0]}"!`;
  }

  if (warning2Reached && waitingPlayers.length > 1) {
    spokenText2 = `Don't worry, "${waitingPlayers[1]}". You still have time.`;
  }

  if (warning3Reached && waitingPlayers.length > 0) {
    spokenText3 = `Ok seriously, let's go "${waitingPlayers[0]}". I have places to be.`;
  }

  return (
    <>
      {spokenText && <Speak text={spokenText} />}
      {spokenText2 && <Speak text={spokenText2} />}
      {spokenText3 && <Speak text={spokenText3} />}
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
              background: "linear-gradient(127deg, var(--main), var(--main-light))",
              borderRadius: "12px",
              padding: "1vw",
              margin: "auto",
              mx: "auto",
              width: "46vw",
              height: "68vh",
            }}
          >
            <h1
              style={{
                color: "white",
                fontFamily: "Concert One",
                fontSize: "2.5em",
              }}
            >
              waiting on
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0rem",
              }}
            >
              {waitingPlayers.map((name: string, i: number) => (
                <li className="li" key={i}>
                  <PlayerBadge name={name} onClick={() => onPlayerKick(name)} />
                </li>
              ))}
            </div>
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
              background: "linear-gradient(127deg, var(--main-light), var(--main))",
              borderRadius: "12px",
              padding: "1vw",
              margin: "auto",
              mx: "auto",
              width: "46vw",
              height: "68vh",
            }}
          >
            <h1
              style={{
                color: "white",
                fontFamily: "Concert One",
                fontSize: "2.5em",
              }}
            >
              done
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0rem",
              }}
            >
              {donePlayers.map((name: string, i: number) => (
                <li className="li" key={i}>
                  {i === 0 && <Speak text={`Thank you, ${name}.`} />}
                  <PlayerBadge name={name} onClick={() => onPlayerKick(name)} />
                </li>
              ))}
            </div>
          </Paper>
        </div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "20px",
        marginRight: "5px",
        fontSize: "1.2em"
      }}>
        <Button
          
          variant="contained"
          sx={{fontSize: "1.1em",
          }}
          disabled={donePlayers.length < 1}
          onClick={() => socket.emit("host-skip-questionnaire")}>
            next
        </Button>
      </div>
    </>
  );
}
