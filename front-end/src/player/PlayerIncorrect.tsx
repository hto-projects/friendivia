import * as React from "react";
import "../style.css";
import incorrect from "../assets/incorrect.png";

export default function PlayerCorrect() {
  return (
    <>
      <div className="incorrect">
        <img className="niceTryImg" src={incorrect} alt="Incorrect" />
        <p className="correctTxt">Nice try</p>
      </div>
    </>
  );
}
