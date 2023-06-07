import * as React from 'react';
import '../style.css';
import { Button } from '@mui/material';
import { Socket } from 'socket.io-client';

interface IHostQuestionnaireProps {
  socket: Socket
}

export default function HostQuestionnaire(props: IHostQuestionnaireProps) {
  const { socket } = props;

  async function onDoThis() {
    socket.emit('nothing');
  }

  return (
    <>
      <p>We are waiting for everyone to compete the questionnaire.</p>
      <Button variant="contained" onClick={onDoThis}>Do This</Button>
    </>
  );
}
