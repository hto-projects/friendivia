import * as React from "react";
import { pickOne, randomRange } from "../util";

const MIN_DOT_SIZE = 10;
const MAX_DOT_SIZE = 20;
const RANDOM_COLORS = ["magenta", "cyan", "red", "lime", "mintgreen", "lightgoldenrodyellow", "blue", "pink"];
const NUM_DOTS = 100;

function Dot(props) {
  const { maxX, maxY } = props;

  const dotStyles: React.CSSProperties = {
    borderRadius: "100%",
    position: "fixed"
  };

  const randomSize = randomRange(MIN_DOT_SIZE, MAX_DOT_SIZE);
  dotStyles.width = `${randomSize}px`;
  dotStyles.height = dotStyles.width;

  dotStyles.left = `${randomRange(-MAX_DOT_SIZE, maxX)}px`;
  dotStyles.top = `${randomRange(-MAX_DOT_SIZE, maxY)}px`;

  dotStyles.background = pickOne(RANDOM_COLORS);

  return <div style={dotStyles}></div>;
}

export default function Background() {
  const backgroundStyles: React.CSSProperties = {
    position: "fixed",
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }

  const maxX = window.innerWidth;
  const maxY = window.innerHeight;

  const dots: React.JSX.Element[] = [];
  for (let i = 0; i < NUM_DOTS; i++) {
    dots.push(<Dot maxX={maxX} maxY={maxY} key={i} />);
  }

  return (
    <div style={backgroundStyles}>
      {dots}
    </div>
  );
}
