import React from "react";
import "../style.css";
import crown from "../assets/crown.png";
import { Button, Paper } from "@mui/material";
import Speak from "../Speak";

interface ILeaderBoardProps {
  playerScores: Array<any>;
  socket: any;
}

export default function HostLeaderBoard(props: ILeaderBoardProps) {
  const socket = props.socket;
  const playerScores = props.playerScores;
  playerScores.sort((p1, p2) => p2.score - p1.score);

  function onPlayAgain() {
    socket.emit("play-again");
  }

  function onPlayAgainWithSamePlayers() {
    socket.emit("play-again-with-same-players");
  }

  function winnerText() {
    const winnerScore = playerScores[0].score;
    const winnerName = playerScores[0].name;
    return `The winner is "${winnerName}" with a score of "${winnerScore}"! Great job!`;
  }

  return (
    <>
      <Speak text={winnerText()} cloud={true} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh", // Ensure the content takes up at least the full viewport height
          paddingBottom: "3rem", // Add space for the buttons at the bottom
        }}
      >
        <h1 style={{ fontFamily: "Concert One" }}>leaderboard</h1>
        <img
          src={crown}
          alt="Crown"
          style={{ width: "8vw", paddingBottom: "1vh", paddingTop: "1vh" }}
        />
        <div className="leaderboard">
          {playerScores.map((ps, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: i < 9 ? "-15px" : "-20px",
                width: "100%",
                paddingBottom: "20px",
              }}
            >
              <Paper
                elevation={3}
                className="lobby_player"
                sx={{
                  background:
                    i === 0
                      ? "linear-gradient(-45deg, cyan, magenta)"
                      : "#757de8",
                  borderRadius: "20px",
                  marginRight: "10px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "Concert One",
                    color: "White",
                    paddingTop: i === 0 ? "8px" : "3px",
                    paddingBottom: i === 0 ? "8px" : "3px",
                    fontSize: i === 0 ? "1.3em" : "1em",
                  }}
                >
                  {ps.name}
                </p>
              </Paper>
              <span
                className="score"
                style={{
                  marginLeft: "-4px",
                  minWidth: "50px",
                  fontSize: i === 0 ? "1.3em" : "1em",
                  padding: i === 0 ? "0.5em" : "3px",
                  fontWeight: i === 0 ? "bold" : "normal",
                  borderRadius: "15px",
                  background:
                    i === 0
                      ? "linear-gradient(-45deg, cyan, magenta)"
                      : "#757de8",
                  boxShadow: i === 0 ? "0 0 10px #FFD700" : "none",
                  width: "40%",
                }}
              >
                {ps.score}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0, // Align at the bottom of the viewport
          width: "100%", // Take full width of the viewport
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#955EC3",
            m: 2,
            fontFamily: "Concert One",
            textTransform: "none",
          }}
          onClick={onPlayAgain}
        >
          play again
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#955EC3",
            m: 2,
            fontFamily: "Concert One",
            textTransform: "none",
          }}
          onClick={onPlayAgainWithSamePlayers}
        >
          play again with same players
        </Button>
      </div>
    </>
  );
}
