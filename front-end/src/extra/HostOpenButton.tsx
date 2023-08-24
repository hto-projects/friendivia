import * as React from "react";

interface IHostOpenButtonProps {
  symbol: string;
  title: string;
  description: string;
  onClick?: () => any;
  bgImage?: string;
  disabled: boolean;
}

export default function HostOpenButton(props: IHostOpenButtonProps): React.ReactElement {
  const { symbol, title, description, onClick, bgImage, disabled } = props;
  const disabledBg = "radial-gradient(circle, var(--main-light), var(--main))";

  return (
    <div
      style={{
        height: "68vh",
        width: "27vw",
        backgroundImage: disabled ? disabledBg : bgImage,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        verticalAlign: "middle",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        margin: "auto",
        marginTop: "5vh",
        cursor: disabled ? "not-allowed" : "pointer",
        filter: disabled ? "grayscale(100%)" : "none",
        pointerEvents: disabled ? "none" : "auto",
      }}
      onClick={!disabled ? onClick : () => {}}
    >
      <p style={{ fontSize: "12em", margin: "0px", padding: "0px" }}>{symbol}</p>
      <h1
        style={{
          color: "rgba(0,0,0,0.8)",
          fontSize: "3em",
          fontWeight: "bold",
          fontFamily: "var(--action-font)",
        }}
      >
        {title}
      </h1>
      <h1
        style={{
          color: "rgba(0,0,0,0.9)",
          fontSize: "1.5em",
          fontWeight: "normal",
          paddingLeft: "2vw",
          paddingRight: "2vw",
          textAlign: "left",
        }}
      >
        {description}
      </h1>
    </div>
    );
}
