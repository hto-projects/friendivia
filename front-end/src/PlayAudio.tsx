import * as React from "react";

export default function PlayAudio(props) {
  const audioUrl = props.src;

  React.useEffect(() => {
    let audio = document.querySelector("audio");
    if (audio) {
      audio.play();
      audio.loop = props.loop;
    }
  }, []);

  return <audio src={audioUrl} loop />;
}
