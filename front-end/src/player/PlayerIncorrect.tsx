import * as React from "react";
import "../style.css";
import incorrect from "../assets/incorrect.png";

export default function PlayerIncorrect(props) {
  const { consolationPts } = props;
  const ptsMsg = consolationPts  ? `+${consolationPts}pts because no one got it` : `No points!`;

  return (
    <>
      <div className="incorrect">
        <img className="niceTryImg" src={incorrect} alt="Incorrect" />
        <p className="correctTxt" style={{ fontFamily: "Concert One" }}>
          Nice try! {ptsMsg}
        </p>
      </div>
    </>
  );
}
