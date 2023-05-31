import * as React from 'react';
import '../style.css';

interface IWaitProps {
  message: String
}

export default function Wait(props: IWaitProps) {
  return (
    <div>
      <h1>Friendpardy</h1>
      <p>{props.message}</p>
    </div>
  );
}
