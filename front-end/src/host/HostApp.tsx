import React from "react";
import HostLobby from "./HostLobby";
import { Socket } from "socket.io-client";
import HostOpen from "./HostOpen";
import HostQuestionnaire from "./HostQuestionnaire";
import HostPreQuiz from "./HostPreQuiz";
import HostShowQuestion from "./HostShowQuestion";
import IQuizQuestion from "back-end/interfaces/IQuizQuestion";
import IGame from "back-end/interfaces/IGame";
import HostShowAnswer from "./HostShowAnswer";
import logo from "../assets/friendpardylogo.png";
import HostLeaderBoard from "./HostLeaderBoard";
import { Button, IconButton } from "@mui/material/";
import HostSettings from "./HostSettings";
import HostTiebreaker from "./HostTiebreaker";
import theme from "../assets/audio/theme.mp3";
import PlayAudio from "../PlayAudio";
import musicOn from "../assets/musicon.png";
import musicOff from "../assets/musicoff.png";
import fillOut from "../assets/audio/fillOut.mp3";
import start from "../assets/audio/start.mp3";
import leader from "../assets/audio/whoWon.mp3";

interface IHostProps {
  socket: Socket;
}

export default function HostApp(props: IHostProps) {
  const gameIdFromStorage = Number(localStorage.getItem("game-id")) || -1;
  const [gameId, setGameId] = React.useState<number>(gameIdFromStorage);
  const [gameState, setGameState] = React.useState<string>("init");
  const [quizQuestions, setQuizQuestions] = React.useState<IQuizQuestion[]>([]);
  const [
    currentQuizQuestionIndex,
    setCurrentQuizQuestionIndex,
  ] = React.useState<number>(-1);
  const [quizQuestionGuesses, setQuizQuestionGuesses] = React.useState([]);
  const [playerScores, setPlayerScores] = React.useState([]);
  const [timePerQuestion, setTimePerQuestion] = React.useState(15);

  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [muted, setMuted] = React.useState<boolean>(false);
  const { socket } = props;
  const [fillOutAudioPlayed, setFillOutAudioPlayed] = React.useState<boolean>(
    false
  );
  const [startAudioPlayed, setStartAudioPlayed] = React.useState<boolean>(
    false
  );
  const [leaderAudioPlayed, setLeaderAudioPlayed] = React.useState<boolean>(
    false
  );

  React.useEffect(() => {
    if (gameState === "pre-leader-board" && !leaderAudioPlayed) {
      const audioStart = new Audio(leader);
      audioStart.play();
      setLeaderAudioPlayed(true);
    } else if (gameState !== "questionnaire") {
      setLeaderAudioPlayed(false);
    }
  }, [gameState]);

  React.useEffect(() => {
    if (gameState === "pre-quiz" && !startAudioPlayed) {
      const audioStart = new Audio(start);
      audioStart.play();
      setStartAudioPlayed(true);
    } else if (gameState !== "questionnaire") {
      setStartAudioPlayed(false);
    }
  }, [gameState]);

  React.useEffect(() => {
    if (gameState === "questionnaire" && !fillOutAudioPlayed) {
      const audioFillOut = new Audio(fillOut);
      audioFillOut.play();
      setFillOutAudioPlayed(true);
    } else if (gameState !== "questionnaire") {
      setFillOutAudioPlayed(false);
    }
  }, [gameState]);

  function muteMusic(muted: boolean) {
    setMuted(!muted);
    if (muted) {
      const audio = document.querySelector("audio");
      if (audio) {
        audio.play();
      }
    } else {
      const audio = document.querySelector("audio");
      if (audio) {
        audio.pause();
      }
    }
  }

  if (!loaded) {
    socket.emit("host-load", gameIdFromStorage);
  }

  React.useEffect(() => {
    function onLoadSuccess(
      data: IGame & { quizQuestionGuesses; playerScores }
    ) {
      setLoaded(true);
      setGameId(data.id);
      setGameState(data.gameState.state);
      setQuizQuestions(data.quizQuestions);
      setCurrentQuizQuestionIndex(data.currentQuestionIndex);
      setQuizQuestionGuesses(data.quizQuestionGuesses);
      setPlayerScores(data.playerScores);
      setTimePerQuestion(data.settings.timePerQuestion);
    }

    function onOpenSuccess(idFromServer: number) {
      setGameId(idFromServer);
      localStorage.setItem("game-id", `${idFromServer}`);
      setGameState("lobby");
    }

    socket.on("host-open-success", onOpenSuccess);
    socket.on("host-load-success", onLoadSuccess);
    socket.on("host-next", onLoadSuccess);

    return () => {
      socket.off("host-open-success", onOpenSuccess);
      socket.off("host-load-success", onLoadSuccess);
      socket.off("host-next", onLoadSuccess);
    };
  }, [gameId, setGameId, gameState, setGameState]);

  function getElementForState(state: string) {
    if (state === "lobby") {
      return <HostLobby socket={socket} gameId={gameId} />;
    } else if (state === "questionnaire") {
      return (
        <>
          <HostQuestionnaire />
        </>
      );
    } else if (state === "pre-quiz") {
      return <HostPreQuiz />;
    } else if (state === "showing-question") {
      const currentQuizQuestion: IQuizQuestion =
        quizQuestions[currentQuizQuestionIndex];
      console.log(currentQuizQuestion);
      const quizQuestionOptions = currentQuizQuestion.optionsList;
      const quizQuestionText = currentQuizQuestion.text;
      const quizQuestionPlayerName = currentQuizQuestion.playerName;

      return (
        <HostShowQuestion
          options={quizQuestionOptions}
          questionText={quizQuestionText}
          playerName={quizQuestionPlayerName}
          socket={socket}
          gameId={gameId}
          timePerQuestion={timePerQuestion}
        />
      );
    } else if (state === "pre-answer") {
      return <p>The guesses are in...</p>;
    } else if (state === "showing-answer") {
      const currentQuizQuestion: IQuizQuestion =
        quizQuestions[currentQuizQuestionIndex];
      const quizQuestionOptions = currentQuizQuestion.optionsList;
      const quizQuestionText = currentQuizQuestion.text;
      const quizQuestionPlayerName = currentQuizQuestion.playerName;
      const correctAnswerIndex = currentQuizQuestion.correctAnswerIndex;
      const quizQuestionsLength = quizQuestions.length;
      return (
        <HostShowAnswer
          options={quizQuestionOptions}
          questionText={quizQuestionText}
          playerName={quizQuestionPlayerName}
          correctAnswerIndex={correctAnswerIndex}
          playerGuesses={quizQuestionGuesses}
          socket={socket}
          gameId={gameId}
          quizLength={quizQuestionsLength}
        />
      );
    } else if (state === "pre-leader-board") {
      return <p>Calculating final scores...</p>;
    } else if (state === "leader-board") {
      return <HostLeaderBoard playerScores={playerScores} socket={socket} />;
    } else if (state === "settings") {
      return (
        <HostSettings
          socket={socket}
          gameId={gameId}
          timePerQuestionSetting={timePerQuestion}
        />
      );
    } else if (state == "tiebreaker") {
      return <HostTiebreaker />;
    } else {
      return <HostOpen socket={socket} />;
    }
  }

  function onSettings() {
    socket.emit("host-settings", gameId);
  }

  return (
    <div className="scroll">
      <PlayAudio src={theme} loop={true} />
      <div className="musicButton">
        <IconButton onClick={() => muteMusic(muted)}>
          <img className="musicIcon" src={muted ? musicOff : musicOn} />
        </IconButton>
      </div>
      <div className="about">
        <img className="logohost" src={logo} />
        {getElementForState(gameState)}
      </div>
      {gameState === "lobby" ? (
        <div className="bottomContainer">
          <p>
            <Button
              className="button"
              variant="contained"
              sx={{
                bgcolor:
                  getComputedStyle(document.body).getPropertyValue("--accent") +
                  ";",
                m: 2,
              }}
              onClick={onSettings}
            >
              Game Settings
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
              href="/about"
            >
              About
            </Button>
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
