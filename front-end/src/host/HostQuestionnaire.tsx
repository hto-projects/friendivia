import * as React from "react";
import "../style.css";
import PlayAudio from "../PlayAudio";
import theme from "../assets/audio/theme.mp3";
import Speak from "../Speak";

export default function HostQuestionnaire() {
  const text = "Please fill out the questionnaires on your devices.";

  return (
    <>
      <Speak text={text} cloud={true} />
      <PlayAudio src={theme} loop={true} />
      <p style={{ fontSize: "1.5em" }}>
        We are waiting for everyone to complete the questionnaire.
      </p>
    </>
  );
}
