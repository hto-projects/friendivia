import * as React from "react";
import "../style.css";
import { Button } from "@mui/material";
import { Socket } from "socket.io-client";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

interface IPreSettingsProps {
  socket: Socket;
  preSettingsId: string;
  timePerQuestionSetting: number;
}

export default function HostPreSettings(props: IPreSettingsProps) {
  const { socket, preSettingsId, timePerQuestionSetting } = props;
  const [timePerQuestion, setTimePerQuestion] = React.useState<number>(timePerQuestionSetting || 15);

  async function onPSBack() {
    socket.emit("host-ps-back", preSettingsId, {timePerQuestion});
  }

  return (
    <>
      <Stack className="joinForm" spacing={2}>
        <p>Time Per Question:</p>
        <TextField
          className="idInput form"
          id="questionTime"
          label="Time (In Seconds)"
          variant="outlined"
          size="small"
          type="number"
          value={timePerQuestion}
          onChange={(e) => setTimePerQuestion(Number(e.target.value))}
        />
        <p>Click below to go back:</p>
        <Button
          variant="contained"
          sx={{
            bgcolor:
              getComputedStyle(document.body).getPropertyValue("--accent") + ";",
          }}
          onClick={onPSBack}
        >
          Back
        </Button>
      </Stack>
    </>
  );
}
