import * as React from "react";
import "../style.css";
import { Button, Paper } from "@mui/material";
import { Socket } from "socket.io-client";
import PlayerOver from "./PlayerOver";

interface RankingProps {
  playerScores: Array<any>;
  currentPlayerName: any;
}

export default function PlayerNewRanking(props: RankingProps) {
  const playerScores = props.playerScores;
  playerScores.sort((p1, p2) => p2.score - p1.score);
  const playerName = props.currentPlayerName;
  var playerToBeat;
  var pointDifference;

  function getPlayerRankDisplay() {
    var message = "";
    for (var i = 0; i < playerScores.length; i++) {
      if (playerScores[i].name === playerName && i != 0) {
        playerToBeat = playerScores[i - 1].name;
        pointDifference = playerScores[i - 1].score - playerScores[i].score;
        if (pointDifference === 0) {
          message = "You are tied with " + playerToBeat;
        } else {
          message =
            "You are " + pointDifference + " points behind " + playerToBeat;
        }
      } else if (playerScores[i].name === playerName && i === 0) {
        pointDifference = playerScores[i].score - playerScores[i + 1].score;
        if (pointDifference === 0) {
          message = "You are tied with " + playerScores[i + 1].name + "!";
        } else {
          message = "You are in first place!";
        }
      }
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "90vh",
          verticalAlign: "center",
          // background: "linear-gradient(-45deg, cyan, magenta)",
        }}
      >
        <p
          style={{
            fontFamily: "Concert One",
            fontSize: "2.4em",
            margin: "auto",
            background: "linear-gradient(-45deg, cyan, magenta)",
            borderRadius: "20px",
            padding: "1em",
            marginLeft: "1em",
            marginRight: "1em",
            border: "2px solid black",
            color: "white",
          }}
        >
          {message}
        </p>
      </div>
    );
  }

  return (
    <>
      <div>{playerScores.length > 1 ? getPlayerRankDisplay() : "What are you doing here?"}</div>
    </>
  );
}
