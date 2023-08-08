import * as React from "react";
import "./style.css";
import { Button } from "@mui/material";

export default function AboutPage() {
  return (
    <>
      <div className="about">
        <h1>About Friendivia</h1>
        <br />
        <p className="body">
          <b>How well do you know your friends?</b>
          <br />
          <br />
          In this friends trivia game (not Friends the tv show), you'll start by
          answering a few questions about yourself. <br />
          <br />
          Then, you'll try to answer some questions about your friends, while
          they try to answer questions about you! <br /> <br />
          You will be rewarded if you know your friends well. You will also be
          rewarded if your friends know you well.
        </p>
        <div className="horizontal">
          <Button
            className="button"
            variant="contained"
            sx={{
              bgcolor:
                getComputedStyle(document.body).getPropertyValue("--accent") +
                ";",
              m: 2,
            }}
            href="/"
          >
            Join a game
          </Button>
          <Button
            className="button"
            variant="contained"
            sx={{
              bgcolor:
                getComputedStyle(document.body).getPropertyValue("--accent") +
                ";",
              m: 2,
            }}
            href="/host"
          >
            Host a game
          </Button>
        </div>
      </div>
    </>
  );
}
