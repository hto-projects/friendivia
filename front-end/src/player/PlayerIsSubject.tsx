import * as React from "react";
import "../style.css";
import incorrect from "../assets/eyes.png";

export default function PlayerIsSubject() {
  return (
    <>
      <div className="subject">
        <img className="correctImg" src={incorrect} alt="You Are The Subject" />
        <p className="subjectTxt">Who knows you best?</p>
      </div>
    </>
  );
}
