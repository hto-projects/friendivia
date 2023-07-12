import * as React from "react";
import "../style.css";
import clock from "../assets/Clock.png";

export default function PlayerRanOutOfTime() {
  return (
    <>
      <div className="subject">
        <img className="correctImg" src={clock} alt="correct" />
        <p className="subjectTxt">Time's Up! Better Luck Next Time.</p>
      </div>
    </>
  );
}
