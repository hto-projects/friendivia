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
            height: "68vh",
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
            filter: "grayscale(100%)",
            cursor: "not-allowed",
            pointerEvents: "none"
          }}
          // onClick={onPreSettings}
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
            Coming Soon. Add custom questions, change time settings, and more!
          </h1>
        </div>
        <div
          style={{
            height: "68vh",
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
            Classic fun friendivia gameplay. Let's start the game!
          </h1>
        </div>
        <div
          style={{
            position: "relative",
            height: "68vh",
            width: "27vw",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            margin: "auto",
            marginTop: "5vh",
            cursor: "not-allowed",
            filter: "grayscale(100%)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              backgroundImage:
                "linear-gradient(-45deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3))",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "10px",
              zIndex: -1,
            }}
          ></div>
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
              fontSize: "1.4em",
              fontWeight: "normal",
              paddingLeft: "2vw",
              paddingRight: "2vw",
              textAlign: "left",
            }}
          >
            Coming Soon. Pick a theme and get unique questions powered by
            OpenAI!
          </h1>
        </div>
      </div>
      <div>
        <Button variant="contained" className="about-button" href="/about"
          sx={{
            background: "#8080ff",
            textTransform: "lowercase",
            fontFamily: `"Concert One", sans-serif`,
            marginTop: "3vh",
            "&:hover": {
              background: "#7070ff"
            }
          }}
          >
            about
          </Button>
      </div>
    </div>
  );
}
