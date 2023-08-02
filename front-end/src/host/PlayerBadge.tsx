import * as React from "react";
import { randomRange } from "../util";
import { Paper, SxProps } from "@mui/material";

const BADGE_WIDTH = 100;
const BADGE_HEIGHT = 20;

export default function PlayerBadge(props): React.ReactElement {
  const { name, onClick } = props;


  const badgeStyles = {
    width: `${BADGE_WIDTH}px`,
    height: `${BADGE_HEIGHT}px`,
    "&:hover": {
      cursor: "pointer",
      boxShadow: 8,
      textDecoration: "line-through"
    }
  };

  return (
    <Paper
      elevation={3}
      className="lobby_player"
      sx={badgeStyles}
      onClick={onClick}
      >
        <p>{name}</p>
      </Paper>
  );
}
