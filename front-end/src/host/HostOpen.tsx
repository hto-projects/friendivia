import * as React from "react";
import "../style.css";
import { Button } from "../extra/FrdvButton";
import { Socket } from "socket.io-client";
import HostOpenButton from "../extra/HostOpenButton";

interface IOpenProps {
  socket: Socket;
}

export default function HostOpen(props: IOpenProps) {
  const { socket } = props;
  const [showCustom, setShowCustom] = React.useState<boolean>(false);

  async function onHost(customGame: string) {
    socket.emit("host-open", customGame);
  }

  async function onPreSettings() {
    socket.emit("host-pre-settings");
  }

  async function onCustomGames() {
    setShowCustom(true);
  }

  async function backToMain() {
    setShowCustom(false);
  }

  const openButtons = (
    <>
      <HostOpenButton
        symbol={"⚙️"}
        title={"custom"}
        description={"Unique question sets for every occasion. Find the perfect game for you!"}
        onClick={onCustomGames}
        disabled={false}
        bgImage={"radial-gradient(circle, var(--left-super-light), var(--left-light))"}
      />
      <HostOpenButton
        symbol={"⚡"}
        title={"classic"}
        description={"Classic fun Friendivia gameplay. Let's start the game!"}
        onClick={() => { onHost("classic") }}
        disabled={false}
        bgImage={"radial-gradient(circle, var(--main-super-light), var(--main-light))"}
      />
      <HostOpenButton
        symbol={"🤖"}
        title={"ai"}
        description={"Coming Soon. Pick a theme and get unique questions powered by OpenAI!"}
        disabled={true}
        bgImage={"radial-gradient(circle, var(--right-super-light), var(--right-light))"}
      />
    </>
  );

  const customButtons = (
    <>
      <HostOpenButton
        symbol={"🏫"}
        title={"classroom"}
        description={"School is in session! This is the perfect question set to engage a younger audience in a classroom setting."}
        onClick={() => onHost("classroom")}
        disabled={false}
        bgImage={"radial-gradient(circle, var(--left-super-light), var(--left-light))"}
      />
      <HostOpenButton
        symbol={"🏢"}
        title={"corporate"}
        description={"Ready for some team building? This question set is designed for optimal use in corporate environments."}
        onClick={() => onHost("corporate")}
        disabled={false}
        bgImage={"radial-gradient(circle, var(--main-super-light), var(--main-light))"}
      />
      <HostOpenButton
        symbol={"🥳"}
        title={"party"}
        description={"Just wanna chill? This is the set for you."}
        onClick={() => onHost("fun")}
        disabled={false}
        bgImage={"radial-gradient(circle, var(--right-super-light), var(--right-light))"}
      />
    </>
  );

  const aboutButton = (
    <Button
      variant="contained"
      className="about-button"
      href="/about"
      sx={{
        marginTop: "3vh",
      }}
    >
      about
    </Button>
  );

  const backButton = (
    <Button
      variant="contained"
      className="about-button"
      onClick={backToMain}
      sx={{
        marginTop: "3vh",
      }}
    >
      back
    </Button>
  )

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "middle",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          verticalAlign: "middle",
          margin: "auto",
        }}
      >
        {showCustom ? customButtons : openButtons}
      </div>
      <div>
        {showCustom ? backButton : aboutButton}
      </div>
    </div>
  );
}
