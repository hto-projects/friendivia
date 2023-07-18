import * as React from "react";
import "../style.css";
import PlayAudio from "../PlayAudio";
import fillOut from "../assets/audio/fillOut.mp3";
import theme from "../assets/audio/theme.mp3";

export default function HostQuestionnaire() {
  return (
    <>
      <>
        <PlayAudio src={fillOut} loop={false} />
      </>
      <p>We are waiting for everyone to complete the questionnaire.</p>
    </>
  );
}
