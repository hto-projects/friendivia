import * as React from "react";
import "../style.css";
import hourglass from "../assets/ufo.gif";

export default function PlayerJoinWait() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: "60vw", height: "50vh" }}
        src={hourglass}
        alt="Correct"
      />
      <p
        style={{
          fontFamily: "Concert One",
          fontSize: "1.5em",
          marginTop: "10vh",
        }}
      >
        transporting to friendivia...
      </p>
    </div>
  );
}
