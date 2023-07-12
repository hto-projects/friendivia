import * as React from "react";
import "../style.css";
import incorrect from "../assets/incorrect.png";

export default function PlayerCorrect() {
  return (
    <>
      <div className="incorrect">
        <img className="correctImg" src={incorrect} alt="correct" />
        <p className="correctTxt">Nice try</p>
      </div>
    </>
  );
}
