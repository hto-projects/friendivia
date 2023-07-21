import * as React from 'react';
import '../style.css';
import { Button } from "@mui/material";

interface IntLeaderboardProps {
    gameId: number;
    socket: any;
    playerScores: Array<any>;
}

export default function HostIntLeaderBoard(props: IntLeaderboardProps) {
  console.log(props.playerScores)
  const playerScores = props.playerScores;
  const ogPlayerScores = playerScores
  console.log("og: ", ogPlayerScores, "before sort: ", playerScores)
  playerScores.sort((p1, p2) => p2.score - p1.score);
  console.log("og: ", ogPlayerScores, "after sort: ", playerScores)

  
  function onNext() {
    props.socket.emit("next-question", props.gameId);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Leaderboard</h1>
        <div className="leaderboard">
          {playerScores.map((ps, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: i < 9 ? "-15px" : "-20px",
                width: "100%",
              }}
            >
              <span
                className="participant"
                style={{
                  fontSize: i === 0 ? "26px" : "16px",
                  fontWeight: i === 0 ? "bold" : "normal",
                  background:
                    i === 0
                      ? "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)"
                      : "#757de8",
                  boxShadow: i === 0 ? "0 0 10px #FFD700" : "none",
                }}
              >
                {ps.name}
              </span>
              <span
                className="score"
                style={{
                  marginLeft: "-4px",
                  minWidth: "50px",
                  fontSize: i === 0 ? "26px" : "16px",
                  fontWeight: i === 0 ? "bold" : "normal",
                  background:
                    i === 0
                      ? "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)"
                      : "#757de8",
                  boxShadow: i === 0 ? "0 0 10px #FFD700" : "none",
                }}
              >
                {ps.score}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="contained"
        style={{ marginTop: "5vh" }}
        sx={{
          bgcolor: getComputedStyle(document.body).getPropertyValue("--accent"),
        }}
        onClick={onNext}
      >
        Go To Next Question
      </Button>
    </>    
  )
}




