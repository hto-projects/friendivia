import * as React from 'react';
import '../style.css';

interface IWaitProps {
  message: String
}

export default function PlayerWait(props: IWaitProps) {
  return (
    <>
      <p>{props.message}</p>
    </>
  );
}
