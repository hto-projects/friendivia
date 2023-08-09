import * as React from "react";
import "../style.css";
import { Button, Paper } from "@mui/material";
import Speak from "../Speak";
import { pickOne } from "../util";

interface IntLeaderboardProps {
  gameId: number;
  socket: any;
  playerScores: Array<any>;
  handsFreeMode: boolean;
}

export default function HostIntLeaderBoard(props: IntLeaderboardProps) {
  const playerScores = props.playerScores;
  const handsFreeMode = props.handsFreeMode;
  const ogPlayerScores = playerScores;
  playerScores.sort((p1, p2) => p2.score - p1.score);

  const randomMessageGenerator = (firstPlayer, secondPlayer, lastPlayer) => {
    let first = `"${firstPlayer.name}"`;
    let second = `"${secondPlayer.name}"`;
    let last = `"${lastPlayer.name}"`;

    const randomMessages = [
      `${first} is in the top spot - let's see how long it lasts.`,
      `Nice job at winning, ${first}.`,
      `Wow! ${first} is heating up...`,
      `Someone please try and stop ${first} from winning.`,
      `${first} is the one to watch`,
      `Please do better ${last}`,
      `I'm very disappointed in you, ${last}`,
      `There's still hope, ${last}... but it's running out`,
      `I wouldn't bet on ${last} at this point`,
      `You're so close, ${second}!`,
      `This is cool. ${first} is my best friend, and they're doing better than everyone else.`,
      `${first} and ${second} are neck and neck! Meaning one of them is in first, and one of them is in second!`,
      `Good luck, ${last}... you're gonna need it.`,
      `${second} is in second place - keep grinding 😤`,
      `${last} - you might want to try cheating next time`
    ];

    // const randomMessagesFemale = [
    //   `${first} is in the top spot - nice job.`,
    //   `Way to go, ${first}.`,
    //   `Wow, ${first} is doing really well.`,
    //   `${first} is the one to watch`,
    //   `You're so close, ${second}.`,
    //   `${first} and ${second} are neck and neck.`,
    //   `Keep trying your best, ${last}.`,
    //   `keep grinding, ${second}. you're almost in first.`,
    // ];

    if (firstPlayer.score === secondPlayer.score) {
      randomMessages.push(`Looks like there's a tie at the top.`);
    }

    return pickOne(randomMessages);
  };

  const randomMessage = randomMessageGenerator(
    playerScores[0],
    playerScores[1],
    playerScores[playerScores.length - 1]
  );

  function onNext() {
    props.socket.emit("next-question", props.gameId);
  }

  return (
    <>
      <Speak text={randomMessage} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontFamily: "Concert One" }}>leaderboard</h1>
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
      {!handsFreeMode ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            style={{ marginTop: "5vh" }}
            sx={{
              bgcolor: "#955EC3",
              fontFamily: "Concert One",
              textTransform: "none",
            }}
            onClick={onNext}
          >
            next question
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
