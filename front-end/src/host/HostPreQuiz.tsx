import * as React from "react";
import "../style.css";
import Speak from "../Speak";

export default function HostPreQuiz() {
  return (
    <>
      <Speak text="Time to start the friend party!" cloud={true} />
      <p>All questionnaires have been completed! The quiz will begin soon...</p>
    </>
  );
}
