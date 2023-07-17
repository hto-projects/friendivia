import * as React from 'react';
import '../style.css';
import PlayAudio from '../PlayAudio';
import glitch from "../assets/audio/glitch.mp3";

export default function HostQuestionnaire() {
  return (
    <>
      <PlayAudio src={glitch} />
      <p>We are waiting for everyone to complete the questionnaire.</p>
    </>
  );
}
