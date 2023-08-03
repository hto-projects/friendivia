import * as React from "react";
import { randomRange } from "../util";
import { Paper, SxProps } from "@mui/material";

export default function PlayerBadge(props): React.ReactElement {
  const { name, onClick } = props;

  const badgeStyles = {
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
        <p style={{margin: 0}}>{name}</p>
      </Paper>
  );
}
