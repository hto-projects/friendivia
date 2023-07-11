import * as React from "react";
import "../style.css";
import incorrect from "../assets/eyes.png";

export default function PlayerIsSubject() {
  return (
    <>
      <div className="subject">
        <img className="correctImg" src={incorrect} alt="correct" />
        <p className="subjectTxt">Who knows you best?</p>
      </div>
    </>
  );
}
