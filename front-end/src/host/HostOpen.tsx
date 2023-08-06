import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";
import meshgradient from "../assets/card.png";

interface IOpenProps {
  socket: Socket;
}

export default function HostOpen(props: IOpenProps) {
  const { socket } = props;

  async function onHost() {
    socket.emit("host-open");
  }

  async function onPreSettings() {
    socket.emit("host-pre-settings");
  }

  return (
    <div
      style={{
        backgroundColor: "#E2E2E2",
        height: "90vh",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "middle",
        margin: "auto",
      }}
    >
      <p></p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          verticalAlign: "middle",
          margin: "auto",
        }}
      >
        <div
          style={{
            height: "75vh",
            width: "27vw",
            backgroundImage: `url(${meshgradient})`,
            backgroundSize: "cover",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            verticalAlign: "middle",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            margin: "auto",
            marginTop: "5vh",
            cursor: "pointer",
          }}
          onClick={onPreSettings}
        >
          <p style={{ fontSize: "15em", margin: "0px", padding: "0px" }}>⚙️</p>
          <h1 style={{ color: "white", fontSize: "2.5em", fontWeight: "bold" }}>
            Custom
          </h1>
          <h1
            style={{
              color: "white",
              fontSize: "1.5em",
              fontWeight: "normal",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              textAlign: "left",
            }}
          >
            Add custom questions, change time settings, and more!
          </h1>
        </div>
        <div
          style={{
            height: "75vh",
            width: "27vw",
            backgroundImage: `url(${meshgradient})`,
            backgroundSize: "cover",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            verticalAlign: "middle",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            margin: "auto",
            marginTop: "5vh",
            cursor: "pointer",
          }}
          onClick={onHost}
        >
          <p style={{ fontSize: "15em", margin: "0px", padding: "0px" }}>⚡</p>
          <h1 style={{ color: "white", fontSize: "2.5em", fontWeight: "bold" }}>
            Classic
          </h1>
          <h1
            style={{
              color: "white",
              fontSize: "1.5em",
              fontWeight: "normal",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              textAlign: "left",
            }}
          >
            Classic fun friendpardy gameplay. Let’s start the pardy!
          </h1>
        </div>
        <div
          style={{
            height: "75vh",
            width: "27vw",
            backgroundImage: `url(${meshgradient})`,
            backgroundSize: "cover",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            verticalAlign: "middle",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            margin: "auto",
            marginTop: "5vh",
            cursor: "pointer",
          }}
        >
          <p style={{ fontSize: "15em", margin: "0px", padding: "0px" }}>🤖</p>
          <h1 style={{ color: "white", fontSize: "2.5em", fontWeight: "bold" }}>
            AI
          </h1>
          <h1
            style={{
              color: "white",
              fontSize: "1.5em",
              fontWeight: "normal",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              textAlign: "left",
            }}
          >
            Pick a theme and get unique questions powered by OpenAI!
          </h1>
        </div>
      </div>
      {/* <Button
        variant="contained"
        sx={{
          bgcolor:
            getComputedStyle(document.body).getPropertyValue("--accent") + ";",
        }}
        onClick={onHost}
      >
        Host
      </Button>
      <Button
        className="button"
        variant="contained"
        sx={{
          bgcolor:
            getComputedStyle(document.body).getPropertyValue("--accent") + ";",
          m: 2,
        }}
        onClick={onPreSettings}
      >
        Game Settings
      </Button> */}
    </div>
  );
}
