import * as React from "react";
import "./style.css";
import logo from "./assets/friendpardymocklogo.png";

export default function LoadingPage(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img className="logo" src={logo} alt="Logo" />
      <p style={{ margin: "auto", textAlign: "center" }}>{props.msg}</p>
    </div>
  );
}
