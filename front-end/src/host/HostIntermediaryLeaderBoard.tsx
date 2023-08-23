import * as React from "react";
import "../style.css";
import { Paper } from "@mui/material";
import { Button } from "../extra/FrdvButton";
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
      `${last} - you might want to try cheating next time`,
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

  let randomMessage;
  if (playerScores.length > 1) {
    randomMessage = randomMessageGenerator(
      playerScores[0],
      playerScores[1],
      playerScores[playerScores.length - 1]
    );
  } else if (playerScores.length === 1) {
    randomMessage = "Congrats on being the only player here, " + playerScores[0].name;
  } else {
    randomMessage = "Please end the game. No one is here.";
  }

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
        <h1 style={{ fontFamily: "var(--action-font)" }}>leaderboard</h1>
        <div className="leaderboard">
          {playerScores.slice(0, 5).map((ps, i) => (
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
                      ? "var(--main-gradient-rev)"
                      : "white",
                  borderRadius: "20px",
                  marginRight: "10px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--action-font)",
                    color: i === 0 ? "white" : "black",
                    paddingTop: i === 0 ? "8px" : "3px",
                    paddingBottom: i === 0 ? "8px" : "3px",
                    fontSize: i === 0 ? "1.3em" : "1em",
                  }}
                >
                  {ps.name}
                </p>
              </Paper>
              <Paper
                elevation={3}
                className="score"
                style={{
                  marginLeft: "-4px",
                  minWidth: "50px",
                  fontSize: i === 0 ? "1.3em" : "1em",
                  padding: i === 0 ? "0.5em" : "3px",
                  fontWeight: i === 0 ? "bold" : "normal",
                  borderRadius: "15px",
                  color: i === 0 ? "white" : "black",
                  background:
                    i === 0
                      ? "var(--main-gradient-rev)"
                      : "white",
                  width: "40%",
                }}
              >
                {ps.score}
              </Paper>
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
            onClick={onNext}
          >
            next
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
