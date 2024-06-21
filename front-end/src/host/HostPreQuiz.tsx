import * as React from "react";
import "../style.css";
import Speak from "../Speak";

export default function HostPreQuiz() {
  return (
    <>
      <Speak text="Every questionnaire has been completed. It's time to start the quiz." cloud={true} />
      <p style={{fontSize: "1.5em"}}>Every questionnaire has been completed! It's time to start the quiz.</p>
    </>
  );
  return <p style={{fontSize: "1.5em"}}>All questionnaires have been completed! The quiz will begin soon...</p>;
}
