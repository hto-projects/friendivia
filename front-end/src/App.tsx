import React from "react";
import { socket, backEndUrl } from "./socket";
import PlayerApp from "./player/PlayerApp";
import HostApp from "./host/HostApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Button from "@mui/material/Button";
import AboutPage from "./AboutPage";
import LoadingPage from "./LoadingPage";

export default function App() {
  const [serverConnection, setServerConnection] = React.useState(
    "Connecting to server..."
  );

  React.useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response: Response = await fetch(`${backEndUrl}/up-check`);
        if (response.ok) {
          setServerConnection("Connected!");
        } else {
          setServerConnection(`Server returned: ${response}`);
        }
      } catch (e) {
        setServerConnection(`Error connecting to server: ${e}`);
      }
    };

    checkServerConnection();
  }, []);

  let page = (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlayerApp socket={socket} />} />
          <Route path="/host" element={<HostApp socket={socket} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
      <p>
        <Button
          className="button"
          variant="contained"
          sx={{
            bgcolor:
              getComputedStyle(document.body).getPropertyValue("--accent") +
              ";",
            m: 2,
          }}
          href="/about"
        >
          About
        </Button>
      </p>
      <Button onClick={() => socket.emit("delete-please")}>Clear Data</Button>
    </>
  );

  if (serverConnection !== "Connected!") {
    page = <LoadingPage msg={"Getting the party started..."} />;
  }

  return page;
}
