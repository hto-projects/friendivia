import * as React from 'react';
import './style.css';

export default function AboutPage() {
  return (
    <>
      <h1>About <i>Friendpardy!</i></h1>
      <p>
        How well do you know your friends? In this freinds trivia game (not Friends the tv show), you'll start by answering a few questions about yourself. Then, you'll try to answer some questions about your friends, while they try to answer questions about you! You will be rewarded if you know your friends well. You will also be rewarded if your friends know you well.
      </p>
      <p><a href="/">Join a Game</a></p>
      <p><a href="/host">Host a Game</a></p>
    </>
  )
}
