import * as React from "react";
import { ttsApiKey } from "./environment";
import { AddAnnouncementContext } from "./host/HostAnnouncementQueue";

export default function Speak(props) {
  const textToSpeak = props.text;
  const callback = props.callback;
  const textHasBeenSpoken = React.useRef(false);
  const addAnnouncement = React.useContext(AddAnnouncementContext);

  function speakFromBrowser() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = textToSpeak;
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
    callback();
  }

  async function createAnnouncementAudioTikTok() {
    const url = `https://tiktok-tts.weilnet.workers.dev/api/generation`;

    const updatedText = `${textToSpeak}`.replace(/([0-9])\s/g, "$1, ");
    const body = {
        text: updatedText,
        voice: 'en_us_001'
    }

    try {
      const response = await fetch(url, {
        method: "Post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const responseJson = await response.json();
      const audioUrl = `data:audio/wav;base64,${responseJson.data}`;
      const audio = new Audio(audioUrl);
      audio.addEventListener("ended", callback);
      addAnnouncement(audio);
    } catch (error) {
      console.error("Error fetching or playing TikTok audio:", error);
      speakFromBrowser();
    }
  }

  async function createAnnouncementAudio() {
    const voiceId = "ThT5KcBeYPX3keUQqHPh";
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const request = {
      text: textToSpeak,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.75,
        similarity_boost: 0.75,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "audio/mpeg",
          "xi-api-key": ttsApiKey,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio from Eleven Labs API");
      }

      const audioBlob = await response.blob();
      const audioURL = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioURL);
      audio.addEventListener("ended", callback);
      addAnnouncement(audio);
    } catch (error) {
      console.error("Error fetching or playing audio:", error);
      createAnnouncementAudioTikTok();
    }
  }

  React.useEffect(() => {
    if (textHasBeenSpoken.current) {
      return;
    }

    textHasBeenSpoken.current = true;
    if (ttsApiKey) {
      createAnnouncementAudio();
    } else {
      createAnnouncementAudioTikTok();
    }
  }, [textToSpeak]);

  return null;
}
