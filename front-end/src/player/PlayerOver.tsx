import React from "react";
import "../style.css";
import correct from "../assets/correct.png";
import incorrect from "../assets/incorrect.png";
import rankone from "../assets/rankone.png";
import ranktwo from "../assets/ranktwo.png";
import rankthree from "../assets/rankthree.png";

interface IOverProps {
  rank: number;
}

export default function PlayerOver(props: IOverProps) {
  return (
    <>
      <div
        className={
          props.rank === 1 || props.rank === 2 || props.rank === 3
            ? "correct"
            : "incorrect"
        }
      >
        {props.rank === 1 ? (
          <img className="correctImg" src={rankone} />
        ) : props.rank === 2 ? (
          <img className="correctImg" src={ranktwo} />
        ) : props.rank === 3 ? (
          <img className="correctImg" src={rankthree} />
        ) : (
          <img className="correctImg" src={incorrect} />
        )}
        {props.rank === 1 ? (
          <p className="correctTxt">You won!</p>
        ) : props.rank === 2 ? (
          <p className="correctTxt">Second!</p>
        ) : props.rank === 3 ? (
          <p className="correctTxt">Third!</p>
        ) : (
          <p className="correctTxt">You lost!</p>
        )}
      </div>
    </>
  );
}
