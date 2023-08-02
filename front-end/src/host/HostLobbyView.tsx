import React from "react";
import "../style.css";
import { Button, Paper } from "@mui/material";
import { Socket } from "socket.io-client";
import Speak from "../Speak";
import open from "../assets/audio/appopen.mp3";
import PlayAudio from "../PlayAudio";
import PlayerBadge from "./PlayerBadge";
import { pickOne } from "../util";

const LEFT_BADGE_COUNT = 5;
const TOP_BADGE_COUNT = 5;
const RIGHT_BADGE_COUNT = 5;
const BOTTOM_BADGE_COUNT = 5;

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

type BadgeHolding = {
  occupyingPlayer: string;
  index: number;
}

export default function HostLobbyView(props: ILobbyViewProps) {
  const { playerNames, gameId, socket } = props;

  const badgeHolders = React.useMemo<BadgeHolding[]>(() => {
    const badgeHolderStart: BadgeHolding[] = [];

    for (let i = 0; i < BOTTOM_BADGE_END; i++) {
      console.log("hm?");
      badgeHolderStart.push({
        occupyingPlayer: "",
        index: i
      });
    }

    console.log(badgeHolderStart);
    return badgeHolderStart;
  }, []);

  console.log(badgeHolders);

  React.useEffect(() => {
    playerNames.forEach(name => {
      const foundPlayer = badgeHolders.find(bh => bh.occupyingPlayer === name);
  
      if (!foundPlayer) {
        const possibleSpots = badgeHolders.filter(bh => !bh.occupyingPlayer);
        const randomBadgeHolding = pickOne(possibleSpots);
        randomBadgeHolding.occupyingPlayer = name;
      }
    });
  }, [playerNames])

  const getLeftBadges = () => {
    console.log(badgeHolders);
    return badgeHolders.slice(0, LEFT_BADGE_END);
  }

  const getTopBadges = () => {
    return badgeHolders.slice(LEFT_BADGE_END, TOP_BADGE_END);
  }

  const getRightBadges = () => {
    return badgeHolders.slice(TOP_BADGE_END, RIGHT_BADGE_END);
  }

  const getBottomBadges = () => {
    return badgeHolders.slice(RIGHT_BADGE_END, BOTTOM_BADGE_END);
  }

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
          {getLeftBadges().map((b, i) => (
            <div className="badge-holding" key={i}>
              {b.occupyingPlayer && <PlayerBadge name={b.occupyingPlayer} onClick={onPlayerKick} />}
            </div>
          ))}
        </div>
        <div className="lobby-middle" style={{width: "30vw", display: "flex", flexDirection: "column", height: "100%"}}>
          <div className="above-instructions" style={{"height": "20vh"}}>
            {getTopBadges().map((b, i) => (
              <div className="badge-holding" key={i}>
                {b.occupyingPlayer && <PlayerBadge name={b.occupyingPlayer} onClick={onPlayerKick} />}
              </div>
            ))}
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <Paper sx={{
              width: "30vw",
              maxWidth: "350px",
              height: "20vh",
              maxHeight: "180px",
              position: "relative",
              zIndex: "1",
              borderRadius: "20px"
            }} elevation={3} className="gameid">
              <p className="id">{gameId}</p>
              <p style={{"fontSize": "1.8em", "fontWeight": "bold", "margin": 0}}>Join at {joinUrl}</p>
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
                backgroundColor: "#8080FF"
              }}
              onClick={onStart}
            >
              Start
            </Button>
            <p>There {playerNames.length !== 1 ? "is" : "are"} currently {playerNames.length} player{playerNames.length !== 1 && "s"} in the game.</p>
          </div>
          <div className="below-instructions" style={{"flexGrow": 1}}>
            {getBottomBadges().map((b, i) => (
              <div className="badge-holding" key={i}>
                {b.occupyingPlayer && <PlayerBadge name={b.occupyingPlayer} onClick={onPlayerKick} />}
              </div>
            ))}
          </div>
        </div>
        <div className="join-instruction-edge">
          {getRightBadges().map((b, i) => (
            <div className="badge-holding" key={i}>
              {b.occupyingPlayer && <PlayerBadge name={b.occupyingPlayer} onClick={onPlayerKick} />}
            </div>
          ))}
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
        <Button
          className="LobbyAbout"
          variant="contained"
          href="/about"
        >
          About
        </Button>
      </div>
    </div>
  );
}
