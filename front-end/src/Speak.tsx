import * as React from "react";

declare var process: {
  env: {
    REACT_APP_BACK_END_URL: string;
    REACT_APP_ELEVEN_LABS_API_KEY: string;
    REACT_APP_USE_ELEVEN_LABS: string;
  };
};

export const apiKey = process.env["REACT_APP_ELEVEN_LABS_API_KEY"] || "";
export const useElevenLabs =
  process.env["REACT_APP_USE_ELEVEN_LABS"] || "false";
export const backEndUrl = process.env["REACT_APP_BACK_END_URL"] || "null";

export default function Speak(props) {
  const textToSpeak = props.text;
  const textHasBeenSpoken = React.useRef(false);

  async function playElevenLabsAudio() {
    if (apiKey) {
      const voiceId = "pNInz6obpgDQGcFmaJgB";
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      const request = {
        text: textToSpeak,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "audio/mpeg",
            "xi-api-key": apiKey,
          },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch audio from Eleven Labs API");
        }

        const audioBlob = await response.blob();
        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);
        audio.play();
      } catch (error) {
        console.error("Error fetching or playing audio:", error);
      }
    }
  }

  React.useEffect(() => {
    console.log("api key:" + apiKey + " use eleven: " + useElevenLabs);
    console.log("back end url: " + backEndUrl);
    if (textHasBeenSpoken.current) {
      return;
    }

    textHasBeenSpoken.current = true;
    if (apiKey != "" && useElevenLabs == "true") {
      playElevenLabsAudio();
    } else {
      const msg = new SpeechSynthesisUtterance();
      msg.text = textToSpeak;
      msg.rate = 0.9;
      console.log("Speaking: " + textToSpeak);
      window.speechSynthesis.speak(msg);
    }
  }, [props.cloud, textToSpeak]);

  return null;
}
