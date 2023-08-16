import * as React from "react";
import "../style.css";
import correct from "../assets/correct.png";

export default function PlayerCorrect(props) {
  const { pts } = props;
  const ptsMsg = pts ? `+${pts} pts` : "";

  return (
    <>
      <div className="correct">
        <img className="correctImg" src={correct} alt="Correct" />
        <p className="correctTxt" style={{ fontFamily: "Concert One" }}>
          {ptsMsg}
        </p>
      </div>
    </>
  );
}
