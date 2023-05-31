import * as React from 'react';
import '../style.css';

interface ILobbyViewProps {
  playerNames: string[],
  gameId: number
}

export default function LobbyView(props: ILobbyViewProps) {
  const { playerNames, gameId } = props;

  return (
    <>
      <h1>Friendpardy</h1>
      <p>Game ID: {gameId}</p>
      <p>These players have joined the game:</p>
      <ul>
        {playerNames.map((name: String) => (
          <li>{name}</li>
        ))}
      </ul>
    </>
  );
}
