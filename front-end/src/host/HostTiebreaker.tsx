import * as React from "react";
import "../style.css";

interface IHostTiebreakerProps {}

export default function HostTiebreaker(props: IHostTiebreakerProps) {
  return (
    <div className="align_center">
      <p className="vs">VS</p>
      <p className="tie">There is a tie!</p>
      <p className="tie">Keep playing until someone takes the lead!</p>
    </div>
  );
}
