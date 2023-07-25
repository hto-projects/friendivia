import * as React from 'react';
import '../style.css';
import { Button, Paper } from "@mui/material";
import { Socket } from "socket.io-client";

interface RankingProps {
    playerScores: Array<any>;
    currentPlayerName: any;
}

export default function PlayerNewRanking(props:RankingProps) {
  const playerScores = props.playerScores;
  playerScores.sort((p1, p2) => p2.score - p1.score);
  const playerName = props.currentPlayerName;
  var playerToBeat;
  var pointDifference;


  function getPlayerRankDisplay(){
    for (var i = 0; i < playerScores.length; i++){
      if (playerScores[i].name === playerName && i != 0) {
        playerToBeat = playerScores[i-1].name;
        pointDifference = playerScores[i-1].score - playerScores[i].score
        if (pointDifference === 0){
          return(<p>You are tied with {playerToBeat}!</p>)
        } else {
          return(<p>You are {pointDifference} points behind {playerToBeat}</p>)
        }
      } else if (playerScores[i].name === playerName && i === 0) {
        pointDifference = playerScores[i].score - playerScores[i+1].score
        if (pointDifference === 0){
          return(<p>You are tied with {playerScores[i+1].name}!</p>)
        } else {
          return(<p>You are in first place!</p>)
        }
      }
    }
    return <p>should not be here, logic flaw</p>
  }
  

  return (
    <>
    <div>
      {getPlayerRankDisplay()}
    </div>   
    </>
  )
}
