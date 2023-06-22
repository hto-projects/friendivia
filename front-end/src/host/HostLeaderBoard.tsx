import * as React from "react";
import "../style.css";
import crown from "../assets/crown.png";

interface ILeaderBoardProps {
  playerScores: Array<any>;
}

export default function HostLeaderBoard(props: ILeaderBoardProps) {
  const playerScores = props.playerScores;
  playerScores.sort((p1, p2) => p2.score - p1.score);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ alignSelf: "center", margin: "auto" }}>Leaderboard</h1>
        <br />
        <img src={crown} style={{ width: "8vw" }} />
        {playerScores.map((ps, i) => (
          <div>
            <p className="participant">
              {ps.name} | {ps.score}
            </p>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
