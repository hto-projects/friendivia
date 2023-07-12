import * as React from "react";
import "../style.css";
import correct from "../assets/correct.png";

export default function PlayerCorrect() {
  return (
    <>
      <div className="correct">
        <img className="correctImg" src={correct} alt="correct" />
        <p className="correctTxt">+200 points</p>
      </div>
    </>
  );
}
