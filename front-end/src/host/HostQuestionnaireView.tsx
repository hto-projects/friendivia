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

  React.useEffect(() => {
    setTimeout(() => {
      setWarningReached(true);
    }, 20000);
  }, [warningReached, setWarningReached]);

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

  function getRandomEmoji(): string {
    const emojis = ["😀", "🎉", "🐶", "🍕", "🚀", "🎸", "🌈", "🦄", "🌻", "🏆"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  return (
    <>
      {spokenText && <Speak text={spokenText} />}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "90vh",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "middle",
          alignContent: "center",
          alignSelf: "center",
          margin: "auto",
        }}
      >
        <div>
          <Paper
            elevation={3}
            sx={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              paddingLeft: "1vw",
              paddingRight: "1vw",
              margin: "auto",
              width: "45vw",
              height: "75vh",
              marginRight: "3vw",
              marginLeft: "1vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            }}
          >
            <h1 style={{ color: "white", marginBottom: "5vh" }}>Waiting on</h1>
            <ul className="ul">
              {waitingPlayers.map((name: string, i: number) => (
                <li className="li" key={i}>
                  <div
                    style={{
                      height: "4vh",
                      width: "auto",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                      margin: "auto",

                      paddingLeft: "10px",
                      paddingRight: "10px",
                      position: "relative",
                      zIndex: 9999,
                    }}
                    onClick={() => onPlayerKick(name)}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1000,
                        background: "#FFFFFF",
                        borderRadius: "10px",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></div>
                    <p
                      style={{
                        margin: "0px",
                        padding: "0px",
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        color: "#000000",
                        zIndex: 9999,
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      {name}
                    </p>
                    <div
                      style={{
                        position: "absolute",
                        top: "-45px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        border: "2px solid purple",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "white",
                        zIndex: 100,
                      }}
                    >
                      <span
                        role="img"
                        aria-label="emoji"
                        style={{ fontSize: "2.2em", zIndex: -1 }}
                      >
                        {getRandomEmoji()}
                      </span>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          </Paper>
        </div>
        <div>
          <Paper
            elevation={3}
            sx={{
              background: "linear-gradient(45deg, #61ed87 30%, #C7E5E2 100%)",
              paddingLeft: "1vw",
              paddingRight: "1vw",
              margin: "auto",
              width: "45vw",
              height: "75vh",
              marginLeft: "1vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            }}
          >
            <h1 style={{ color: "white", marginBottom: "5vh" }}>Done</h1>
            <ul className="ul">
              {donePlayers.map((name: string, i: number) => (
                <li className="li" key={i}>
                  <div
                    style={{
                      height: "4vh",
                      width: "auto",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                      margin: "auto",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      position: "relative",
                      zIndex: 9999,
                    }}
                    onClick={() => onPlayerKick(name)}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1000,
                        background: "#FFFFFF",
                        borderRadius: "10px",
                      }}
                    ></div>
                    <p
                      style={{
                        margin: "0px",
                        padding: "0px",
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        color: "#000000",
                        zIndex: 9999,
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      {name}
                    </p>
                    <div
                      style={{
                        position: "absolute",
                        top: "-45px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        border: "2px solid purple",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "white",
                        zIndex: 100,
                      }}
                    >
                      <span
                        role="img"
                        aria-label="emoji"
                        style={{ fontSize: "2.2em", zIndex: -1 }}
                      >
                        {getRandomEmoji()}
                      </span>
                    </div>
                  </div>
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
