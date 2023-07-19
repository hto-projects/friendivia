import * as React from "react";
import "../style.css";
import PlayAudio from "../PlayAudio";
import theme from "../assets/audio/theme.mp3";

export default function HostQuestionnaire() {
  return (
    <>
      <PlayAudio src={theme} loop={true} />
      <p style={{fontSize: "1.5em"}}>We are waiting for everyone to complete the questionnaire.</p>
    </>
  );
}
