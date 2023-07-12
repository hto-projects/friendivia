import React from "react";
import "../style.css";
import correct from "../assets/correct.png";
import incorrect from "../assets/incorrect.png";

interface IOverProps {
  rank: number;
}

export default function PlayerOver(props: IOverProps) {
  return (
    <>
      <div className={props.rank === 1 ? "correct" : "incorrect"}>
        {props.rank === 1 ? (
          <img className="correctImg" src={correct} />
        ) : (
          <img className="correctImg" src={incorrect} />
        )}
        {props.rank === 1 ? (
          <p className="correctTxt">You won!</p>
        ) : (
          <p className="correctTxt">You lost!</p>
        )}
      </div>
    </>
  );
}
