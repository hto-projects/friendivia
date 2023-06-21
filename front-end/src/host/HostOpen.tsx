import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";

interface IOpenProps {
  socket: Socket;
}

export default function HostOpen(props: IOpenProps) {
  const { socket } = props;

  async function onHost() {
    socket.emit("host-open");
  }

  return (
    <>
      <p>Click below to host a new game:</p>
      <Button
        variant="contained"
        sx={{
          bgcolor:
            getComputedStyle(document.body).getPropertyValue("--accent") + ";",
        }}
        onClick={onHost}
      >
        Host
      </Button>
    </>
  );
}
