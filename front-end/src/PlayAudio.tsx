import * as React from "react";

export default function PlayAudio(props) {
    const audioUrl = props.src;
    React.useEffect(() => {
        let audio = document.querySelector("audio");
        let playing:boolean = (localStorage.getItem('Music-Playing') === 'true' ? true : false);
        if (audio && playing) {
                audio.play();
        }
    }, []);

    return <audio src={audioUrl} loop />;
}
