import * as React from "react";
import "../style.css";
import hourglass from "../assets/hourglass.png";

interface IWaitProps {
  message: String;
}

export default function PlayerWait(props: IWaitProps) {
  return (
    <div className="wait">
      <img className="hourglass" src={hourglass} alt="Correct" />
      <p className="waitTxt" style={{ fontFamily: "Concert One" }}>
        {props.message}
      </p>
    </div>
  );
}
