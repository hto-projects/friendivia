import * as React from "react";
import { ttsApiKey } from "./environment";
import { AddAnnouncementContext } from "./host/HostAnnouncementQueue";

function replaceFriendivia(text: string) {
  return text.replace("friendivia", " friend divvy-uh ");
}

let voices: any = [];
let voice: any = null;

function populateBrowserVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  voices = speechSynthesis.getVoices().filter((voice) => voice.lang.startsWith("en"));
  voice = voices.find(v => v.name.includes("Connor")) || (voices.length > 3 && voices[3]) || null;
}

window.speechSynthesis.onvoiceschanged = populateBrowserVoiceList;
populateBrowserVoiceList();

export default function Speak(props) {
  const textToSpeak = replaceFriendivia(props.text);
  const callback = props.callback;
  const textHasBeenSpoken = React.useRef(false);
  const addAnnouncement = React.useContext(AddAnnouncementContext);

  function speakFromBrowser() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = textToSpeak;
    msg.rate = 1.2;
    msg.pitch = .5;
    msg.voice = voice;
    msg.onend = callback;
    window.speechSynthesis.speak(msg);
  }

  async function createAnnouncementAudioTikTok() {
    const url = `https://tiktok-tts.weilnet.workers.dev/api/generation`;

    const updatedText = `${textToSpeak}`.replace(/([0-9])\s/g, "$1, ");
    const body = {
        text: updatedText,
        voice: 'en_us_rocket'
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
      speakFromBrowser();
    }
  }, [textToSpeak]);

  return null;
}
