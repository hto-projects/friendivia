import React, { useRef } from "react";
import "../style.css";
import { Button, Paper } from "@mui/material";
import { Socket } from "socket.io-client";
import Speak from "../Speak";
import open from "../assets/audio/appopen.mp3";
import PlayAudio from "../PlayAudio";
import meshgradient from "../assets/button.png";
import nametag from "../assets/nametag.png";

interface ILobbyViewProps {
  playerNames: string[];
  gameId: number;
  socket: Socket;
}

export default function HostLobbyView(props: ILobbyViewProps) {
  const { playerNames, gameId, socket } = props;
  const playerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const joinUrl = window.location.href
    .replace("/host", "")
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "");
  const gameStr = gameId
    .toString()
    .split("")
    .join(" ");

  async function onStart() {
    socket.emit("host-start", gameId);
  }

  async function onPlayerKick(name: string) {
    socket.emit("host-kick-player", name);
  }

  function onSettings() {
    socket.emit("host-settings", gameId);
  }

  function getRandomEmoji(): string {
    const emojis = ["😀", "🎉", "🐶", "🍕", "🚀", "🎸", "🌈", "🦄", "🌻", "🏆"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  function handlePlayerHover(name: string) {
    const playerElement = playerRefs.current[name];
    if (playerElement) {
      playerElement.style.cursor = "pointer";
      playerElement.style.boxShadow = "0px 0px 8px 0px rgba(0,0,0,0.75)";
      playerElement.style.textDecoration = "line-through";
    }
  }

  function handlePlayerLeave(name: string) {
    const playerElement = playerRefs.current[name];
    if (playerElement) {
      playerElement.style.cursor = "default";
      playerElement.style.boxShadow = "none";
      playerElement.style.textDecoration = "none";
    }
  }

  return (
    <>
      <p></p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          background: "#E2E2E2",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "33vw",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          {playerNames.map((name, index) => {
            const playersPerRow = 2;
            const rowIndex = Math.floor(index / playersPerRow);
            const rowStyle = {
              display: "flex",
              flexDirection: "row" as const,
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              marginTop: "5vh",
              zIndex: 9999,
            };

            if (index % 2 == 0) {
              return (
                <div key={name} style={rowStyle}>
                  <div
                    style={{
                      height: "4vh",
                      width: "auto",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                      margin: "auto",
                      marginRight: "5vh",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      position: "relative",
                      backgroundImage: `url(${nametag})`,
                      backgroundSize: "cover",
                      zIndex: 9999,
                    }}
                    ref={(ref) => (playerRefs.current[name] = ref)}
                    onMouseEnter={() => handlePlayerHover(name)}
                    onMouseLeave={() => handlePlayerLeave(name)}
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
                        backgroundImage: `url(${meshgradient})`,
                        backgroundSize: "cover",
                        borderRadius: "10px",
                      }}
                    ></div>
                    <p
                      style={{
                        margin: "0px",
                        padding: "0px",
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        color: "white",
                        zIndex: 9999,
                        paddingTop: "20px",
                        paddingBottom: "25px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
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
                </div>
              );
            }

            return <></>;
          })}
        </div>

        <div style={{ width: "33vw" }}>
          <div className="host-lobby" style={{ background: "#E2E2E2" }}>
            <Speak text={`Join at "${joinUrl}"!! Use game I.D.: ${gameStr}`} />
            <PlayAudio src={open} loop={false} />
            <div
              style={{
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                marginTop: "5vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Paper
                  elevation={3}
                  style={{
                    margin: "0",
                    width: "26vw",
                    borderRadius: "10px",
                    zIndex: 9999,
                  }}
                >
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      fontSize: "8em",
                      fontWeight: "bolder",
                    }}
                  >
                    {gameId}
                  </p>
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      fontSize: "1.8em",
                      fontWeight: "bold",
                      paddingBottom: "10px",
                    }}
                  >
                    Join at {joinUrl}
                  </p>
                </Paper>
                <Button
                  variant="contained"
                  disabled={playerNames.length < 2}
                  sx={{
                    fontSize: "2em",
                    width: "100%",
                    backgroundImage: `url(${meshgradient})`,
                    backgroundSize: "cover",
                    borderRadius: "10px",
                    height: "10vh",
                    marginTop: "-10px",
                  }}
                  onClick={onStart}
                >
                  Start
                </Button>
                <p style={{ fontSize: "2.5em" }}>
                  {playerNames.length + " players"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "33vw",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          {playerNames.map((name, index) => {
            const playersPerRow = 2;
            const rowIndex = Math.floor(index / playersPerRow);
            const rowStyle = {
              display: "flex",
              flexDirection: "row" as const,
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              marginTop: "5vh",
              zIndex: 9999,
            };

            if (index % 2 !== 0) {
              return (
                <div key={name} style={rowStyle}>
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
                      marginRight: "5vh",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      position: "relative",
                      zIndex: 9999,
                    }}
                    ref={(ref) => (playerRefs.current[name] = ref)}
                    onMouseEnter={() => handlePlayerHover(name)}
                    onMouseLeave={() => handlePlayerLeave(name)}
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
                </div>
              );
            }

            return <></>;
          })}
        </div>
      </div>
    </>
  );
}
