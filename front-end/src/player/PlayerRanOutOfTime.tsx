import * as React from "react";
import "../style.css";
import clock from "../assets/Clock.png";

export default function PlayerRanOutOfTime() {
  return (
    <>
      <div className="subject">
        <img className="correctImg" src={clock} alt="Ran Out Of Time" />
        <p className="subjectTxt" style={{ fontFamily: "Concert One" }}>
          Time's up, better luck next time!
        </p>
      </div>
    </>
  );
}
