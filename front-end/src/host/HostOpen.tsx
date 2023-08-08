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
            height: "71vh",
            width: "27vw",
            backgroundImage:
              "linear-gradient(-45deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3))",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            verticalAlign: "middle",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            margin: "auto",
            marginTop: "5vh",
            cursor: "pointer",
          }}
          onClick={onPreSettings}
        >
          <p style={{ fontSize: "12em", margin: "0px", padding: "0px" }}>⚙️</p>
          <h1
            style={{
              color: "rgba(0,0,0,0.8)",
              fontSize: "3em",
              fontWeight: "bold",
              fontFamily: "Concert One",
            }}
          >
            custom
          </h1>
          <h1
            style={{
              color: "rgba(0,0,0,0.9)",
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
            height: "71vh",
            width: "27vw",
            backgroundImage:
              "linear-gradient(-45deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3))",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            verticalAlign: "middle",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            margin: "auto",
            marginTop: "5vh",
            cursor: "pointer",
          }}
          onClick={onHost}
        >
          <p style={{ fontSize: "12em", margin: "0px", padding: "0px" }}>⚡</p>
          <h1
            style={{
              color: "rgba(0,0,0,0.8)",
              fontSize: "3em",
              fontWeight: "bold",
              fontFamily: "Concert One",
            }}
          >
            classic
          </h1>
          <h1
            style={{
              color: "rgba(0,0,0,0.9)",
              fontSize: "1.5em",
              fontWeight: "normal",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              textAlign: "left",
            }}
          >
            Classic fun friendivia gameplay. Let’s start the game!
          </h1>
        </div>
        <div
          style={{
            height: "71vh",
            width: "27vw",
            backgroundImage:
              "linear-gradient(-45deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3))",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            verticalAlign: "middle",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            margin: "auto",
            marginTop: "5vh",
            cursor: "pointer",
          }}
        >
          <p style={{ fontSize: "12em", margin: "0px", padding: "0px" }}>🤖</p>
          <h1
            style={{
              color: "rgba(0,0,0,0.8)",
              fontSize: "3em",
              fontWeight: "bold",
              fontFamily: "Concert One",
            }}
          >
            ai
          </h1>
          <h1
            style={{
              color: "rgba(0,0,0,0.9)",
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
