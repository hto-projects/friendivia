import * as React from 'react';
import '../style.css';

interface IWaitProps {
  message: String
}

export default function Wait(props: IWaitProps) {
  return (
    <>
      <p>{props.message}</p>
    </>
  );
}
