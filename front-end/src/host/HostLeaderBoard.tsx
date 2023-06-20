import * as React from "react";
import "../style.css";

interface ILeaderBoardProps {
  playerScores: Array<any>;
}

export default function HostLeaderBoard(props: ILeaderBoardProps) {
  const playerScores = props.playerScores;

  playerScores.sort((p1, p2) => p1.score - p2.score);

  return (
    <>
      <h1>Leader board</h1>
      <ol>
        {playerScores.map((ps, i) => (
          <li key={i}>{ps.name}: {ps.score}</li>
        ))}
      </ol>
    </>
  );
}
