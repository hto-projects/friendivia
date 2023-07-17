import * as React from 'react';
import '../style.css';
import Speak from '../Speak';

export default function HostQuestionnaire() {
  const text = "Please fill out the questionnaires on your devices.";

  return (
    <>
      <Speak text={text} />
      <p>{text}</p>
    </>
  );
}
