import React from "react";
import "../style.css";
import { Button, Paper } from "@mui/material";
import { Socket } from "socket.io-client";
import Speak from "../Speak";
import open from "../assets/audio/appopen.mp3";
import PlayAudio from "../PlayAudio";
import PlayerBadge from "./PlayerBadge";
import { pickOne } from "../util";

const LEFT_BADGE_COUNT = 12;
const TOP_BADGE_COUNT = 2;
const RIGHT_BADGE_COUNT = 12;
const BOTTOM_BADGE_COUNT = 4;

const LEFT_BADGE_START = 0;
const LEFT_BADGE_END = LEFT_BADGE_COUNT;
const TOP_BADGE_END = LEFT_BADGE_END + TOP_BADGE_COUNT;
const RIGHT_BADGE_END = TOP_BADGE_END + RIGHT_BADGE_COUNT;
const BOTTOM_BADGE_END = RIGHT_BADGE_END + BOTTOM_BADGE_COUNT;

interface ILobbyViewProps {
  playerNames: string[];
  gameId: number;
  socket: Socket;
}

export default function HostLobbyView(props: ILobbyViewProps) {
  const { playerNames, gameId, socket } = props;

  const [badgeSpots, setBadgeSpots] = React.useState<string[]>(
    new Array(BOTTOM_BADGE_END).fill("")
  );

  const getSliceOfBadges = (start, end) => {
    return badgeSpots.slice(start, end).map((name, i) => (
      <div className="badge-holding" key={i}>
        {name && <PlayerBadge name={name} onClick={() => onPlayerKick(name)} />}
      </div>
    ));
  };

  const getOpenBadgeSpotIndices = () => {
    const openSpots: number[] = [];
    for (let i = 0; i < badgeSpots.length; i++) {
      if (badgeSpots[i] === "") {
        openSpots.push(i);
      }
    }

    return openSpots;
  };

  React.useEffect(() => {
    const updatedBadgeSpots = badgeSpots.slice();
    for (let i = 0; i < badgeSpots.length; i++) {
      let spot = badgeSpots[i];
      const spotTaken = playerNames.some((name) => name === spot);

      if (!spotTaken) {
        updatedBadgeSpots[i] = "";
      }
    }

    for (let i = 0; i < playerNames.length; i++) {
      let name = playerNames[i];
      const playerHeld = badgeSpots.some((spot) => spot === name);

      if (!playerHeld) {
        const possibleSpots = getOpenBadgeSpotIndices();
        const randomOpenIndex = pickOne(possibleSpots);
        updatedBadgeSpots[randomOpenIndex] = name;
      }
    }

    setBadgeSpots(() => updatedBadgeSpots);
  }, [playerNames]);

  const joinUrl = window.location.href
    .replace("/host", "")
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "");
  const gameStr = gameId
    .toString()
    .split("")
    .join(" ");

  async function onStart() {
    socket.emit("host-start", gameId);
  }

  async function onPlayerKick(name: string) {
    socket.emit("host-kick-player", name);
  }

  function onSettings() {
    socket.emit("host-settings", gameId);
  }

  return (
    <div className="host-lobby">
      <Speak text={`Join at "${joinUrl}"!! Use game I.D.: ${gameStr}`} />
      <PlayAudio src={open} loop={false} />
      <div className="join-instructions">
        <div className="join-instruction-edge">
          {getSliceOfBadges(LEFT_BADGE_START, LEFT_BADGE_END)}
        </div>
        <div
          className="lobby-middle"
          style={{
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div className="above-instructions" style={{ height: "20vh" }}>
            {getSliceOfBadges(LEFT_BADGE_END, TOP_BADGE_END)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                width: "30vw",
                maxWidth: "350px",
                height: "20vh",
                maxHeight: "180px",
                position: "relative",
                zIndex: "1",
                borderRadius: "20px",
              }}
              elevation={3}
              className="gameid"
            >
              <p className="id">{gameId}</p>
              <p style={{ fontSize: "1.8em", fontWeight: "bold", margin: 0 }}>
                Join at {joinUrl}
              </p>
            </Paper>
            <Button
              variant="contained"
              disabled={playerNames.length < 2}
              sx={{
                marginTop: "-30px",
                paddingTop: "40px",
                borderRadius: "20px",
                maxWidth: "350px",
                width: "30vw",
                fontSize: "1.5em",
                backgroundColor: "#8080FF",
              }}
              onClick={onStart}
            >
              Start
            </Button>
            <p>
              There {playerNames.length !== 1 ? "are" : "is"} currently{" "}
              {playerNames.length} player{playerNames.length !== 1 && "s"} in
              the game.
            </p>
          </div>
          <div className="below-instructions" style={{ flexGrow: 1 }}>
            {getSliceOfBadges(RIGHT_BADGE_END, BOTTOM_BADGE_END)}
          </div>
        </div>
        <div className="join-instruction-edge">
          {getSliceOfBadges(TOP_BADGE_END, RIGHT_BADGE_END)}
        </div>
      </div>
      <div className="lobby-bottom-bar">
        <Button
          className="LobbySettings"
          variant="contained"
          onClick={onSettings}
        >
          Game Settings
        </Button>
        <Button className="LobbyAbout" variant="contained" href="/about">
          About
        </Button>
      </div>
    </div>
  );
}
