import * as React from "react";
import "./style.css";

export default function LoadingPage(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Friendivia</h1>
      <p style={{ margin: "auto", textAlign: "center" }}>{props.msg}</p>
    </div>
  );
}
