import * as React from "react";
import "../style.css";
import hourglass from "../assets/hourglass.png";

interface IWaitProps {
  message: String;
}

export default function PlayerWait(props: IWaitProps) {
  return (
    <div className="wait" style={{ overflow: "hidden" }}>
      <img
        className="hourglass"
        style={{ height: "50vh", marginTop: "-10vh" }}
        src={hourglass}
        alt="Correct"
      />
      <p
        className="waitTxt"
        style={{ fontFamily: "Concert One", marginTop: "10vh" }}
      >
        {props.message}
      </p>
    </div>
  );
}
