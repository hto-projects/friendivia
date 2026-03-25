import * as React from 'react';
import '../style.css';
import { Socket } from 'socket.io-client';
import PlayerJoinForm from './PlayerJoinForm';

interface IKickProps {
  socket: Socket
}

export default function PlayerKicked(props: IKickProps) {
  const { socket } = props;

  return (
    <PlayerJoinForm socket={socket} playerState={"init"} />
  )
}
