import * as React from 'react';
import '../style.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Socket } from 'socket.io-client';
import Wait from './Wait';

interface IQuestionnaireFormProps {
  socket: Socket,
  playerState: any,
  questions: string[]
}

export default function QuestionnaireForm(props: IQuestionnaireFormProps) {
  const [answers, setAnswers] = React.useState<string[]>([]);
  const inMessage = `Submission accepted! Please wait for the other players to finish.`;

  const { socket, playerState, questions } = props;

  function onSubmitQuestionnaire() {
    socket.emit('player-submit-questionnaire', answers);
  }

  function onInputChange(newValue: string, index: number) {
    const newAnswers: string[] = [];
    for (let i = 0; i < questions.length; i++) {
      if (index === i) {
        newAnswers[i] = newValue;
      } else {
        newAnswers[i] = answers[i];
      }
    }
    
    setAnswers(newAnswers);
  }

  console.log(questions);

  const questionnaireInputs = (
    <>
      <p>Please answer all questions below.</p>
      {
        questions.map((q, i) => (
          <div key={i}>
            <p>{q}</p>
            <TextField 
              id={"question-" + i}
              label={"Answer " + (i+1)}
              variant="outlined"
              size="small"
              value={answers[i]}
              onChange={e => onInputChange(e.target.value, i)}
            />
          </div>
        ))
      }
      <Button variant="contained" onClick={onSubmitQuestionnaire}>
        Submit
      </Button>
      <p style={{color:"red"}}>{playerState.message}</p>
    </>
  );

  return playerState.state === 'submitted-questionnaire-waiting' ? <Wait message={inMessage} /> : questionnaireInputs;
}
