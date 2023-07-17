import * as React from "react";

export default function Speak(props) {
    const textToSpeak = props.text;
    const textHasBeenSpoken = React.useRef(false);

    const msg = new SpeechSynthesisUtterance();
    msg.text = textToSpeak;
  
    React.useEffect(() => {
      if (textHasBeenSpoken.current) {
        return;
      }
    
      textHasBeenSpoken.current = true;
      window.speechSynthesis.speak(msg);
    }, []); 

    return null;
}
