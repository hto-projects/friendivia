import React from "react";
import HostLobby from "./HostLobby";
import { Socket } from "socket.io-client";
import HostOpen from "./HostOpen";
import HostQuestionnaire from "./HostQuestionnaire";
import HostPreQuiz from "./HostPreQuiz";
import HostShowQuestion from "./HostShowQuestion";
import IQuizQuestion from "back-end/interfaces/IQuizQuestion";
import IGame from "back-end/interfaces/IGame";
import IPreGameSettings from "back-end/interfaces/IPreGameSettings";
import HostShowAnswer from "./HostShowAnswer";
import HostLeaderBoard from "./HostLeaderBoard";
import { Button, IconButton } from "@mui/material/";
import HostSettings from "./HostSettings";
import HostTiebreaker from "./HostTiebreaker";
import HostIntLeaderBoard from "./HostIntermediaryLeaderBoard";
import Speak from "../Speak";
import lobbyMusic from "../assets/audio/theme.mp3";
import PlayAudio from "../PlayAudio";
import musicOn from "../assets/musicon.png";
import musicOff from "../assets/musicoff.png";
import IQuestionnaireQuestion from "back-end/interfaces/IQuestionnaireQuestion";
import {
  HostAnnouncementQueue,
  AddAnnouncementContext,
} from "./HostAnnouncementQueue";
import "./HostStyles.css";

interface IHostProps {
  socket: Socket;
}

export default function HostApp(props: IHostProps) {
  const gameIdFromStorage = Number(localStorage.getItem("game-id")) || -1;
  const settingsIdFromStorage =
    String(localStorage.getItem("settings-id")) || "-1";
  const [gameId, setGameId] = React.useState<number>(gameIdFromStorage);
  const [preSettingsId, setPreSettingsId] = React.useState<string>(
    settingsIdFromStorage
  );
  const [gameState, setGameState] = React.useState<string>("init");
  const [settingsState, setSettingsState] = React.useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = React.useState<IQuizQuestion[]>([]);
  const [
    currentQuizQuestionIndex,
    setCurrentQuizQuestionIndex,
  ] = React.useState<number>(-1);
  const [quizQuestionGuesses, setQuizQuestionGuesses] = React.useState([]);
  const [playerScores, setPlayerScores] = React.useState([]);
  const [playersInGame, setPlayersInGame] = React.useState([]);
  const [timePerQuestion, setTimePerQuestion] = React.useState<number>(15);
  const [
    numQuestionnaireQuestions,
    setNumQuestionnaireQuestions,
  ] = React.useState<number>(5);
  const [numQuizQuestions, setNumQuizQuestions] = React.useState<number>(5);
  const [handsFreeMode, setHandsFreeMode] = React.useState<boolean>(false);
  const [timePerAnswer, setTimePerAnswer] = React.useState<number>(10);
  const [timePerLeaderboard, setTimePerLeaderboard] = React.useState<number>(5);
  const [prioritizeCustomQs, setPrioritizeCustomQs] = React.useState<boolean>(
    true
  );
  const [customQuestions, setCustomQuestions] = React.useState<
    IQuestionnaireQuestion[]
  >([]);

  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [muted, setMuted] = React.useState<boolean>(false);

  const [
    announcementAudioObjects,
    setAnnouncementAudioObjects,
  ] = React.useState<any>([]);
  const addAnnouncement = (newAnnouncementAudio) => {
    setAnnouncementAudioObjects((arr) => [...arr, newAnnouncementAudio]);
  };

  const { socket } = props;

  function muteMusic(muted: boolean) {
    setMuted(!muted);
    localStorage.setItem("Music-Playing", muted.toString());

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
    socket.emit("settings-load", settingsIdFromStorage);
  }

  function onEndGameClicked() {
    if (confirm("Are you sure you want to end this game?")) {
      socket.emit("host-end-game");
    }
  }

  React.useEffect(() => {
    function onLoadSuccess(
      data: IGame & { quizQuestionGuesses; playerScores; playersInGame }
    ) {
      setLoaded(true);
      setGameId(data.id);
      setGameState(data.gameState.state);
      setQuizQuestions(data.quizQuestions);
      setCurrentQuizQuestionIndex(data.currentQuestionIndex);
      setQuizQuestionGuesses(data.quizQuestionGuesses);
      setPlayerScores(data.playerScores);
      setPlayersInGame(data.playersInGame);
      setTimePerQuestion(data.settings.timePerQuestion);
      setNumQuestionnaireQuestions(data.settings.numQuestionnaireQuestions);
      setNumQuizQuestions(data.settings.numQuizQuestions);
      setHandsFreeMode(data.settings.handsFreeMode);
      setTimePerAnswer(data.settings.timePerAnswer);
      setTimePerLeaderboard(data.settings.timePerLeaderboard);
      setPrioritizeCustomQs(data.settings.prioritizeCustomQs);
      setCustomQuestions(data.settings.customQuestions);
    }

    function onSettingsLoadSuccess(data: IPreGameSettings) {
      setPreSettingsId(data.id);
      setSettingsState(data.settingsState);
      setTimePerQuestion(data.settings.timePerQuestion);
      setNumQuestionnaireQuestions(data.settings.numQuestionnaireQuestions);
      setNumQuizQuestions(data.settings.numQuizQuestions);
      setHandsFreeMode(data.settings.handsFreeMode);
      setTimePerAnswer(data.settings.timePerAnswer);
      setTimePerLeaderboard(data.settings.timePerLeaderboard);
      setPrioritizeCustomQs(data.settings.prioritizeCustomQs);
      setCustomQuestions(data.settings.customQuestions);
    }

    function onOpenSuccess(idFromServer: number) {
      setGameId(idFromServer);
      localStorage.setItem("game-id", `${idFromServer}`);
      setGameState("lobby");
    }

    function onPresettingsSuccess(idFromServer: string) {
      setPreSettingsId(idFromServer);
      localStorage.setItem("settings-id", `${idFromServer}`);
      setSettingsState(true);
    }

    function onHostGameEnded() {
      localStorage.setItem("game-id", "");
      window.location.reload();
    }

    socket.on("host-open-success", onOpenSuccess);
    socket.on("host-load-success", onLoadSuccess);
    socket.on("host-next", onLoadSuccess);
    socket.on("presettings-close", onSettingsLoadSuccess);
    socket.on("host-presettings-success", onPresettingsSuccess);
    socket.on("settings-load-success", onSettingsLoadSuccess);

    socket.on("host-game-ended", onHostGameEnded);

    return () => {
      socket.off("host-open-success", onOpenSuccess);
      socket.off("host-load-success", onLoadSuccess);
      socket.off("host-next", onLoadSuccess);
      socket.off("presettings-close", onSettingsLoadSuccess);
      socket.off("host-presettings-success", onPresettingsSuccess);
      socket.off("settings-load-success", onSettingsLoadSuccess);
    };
  }, [gameId, setGameId, gameState, setGameState]);

  function getElementForState(state: string, settingsState: boolean) {
    if (state === "lobby") {
      socket.emit("reload-players");
      return <HostLobby socket={socket} gameId={gameId} />;
    } else if (state === "questionnaire") {
      return (
        <HostQuestionnaire
          socket={socket}
          gameId={gameId}
          playersInGame={playersInGame}
        />
      );
    } else if (state === "pre-quiz") {
      return <HostPreQuiz />;
    } else if (state === "showing-question") {
      const currentQuizQuestion: IQuizQuestion =
        quizQuestions[currentQuizQuestionIndex];
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
          handsFreeMode={handsFreeMode}
        />
      );
    } else if (state === "pre-answer") {
      return (
        <>
          <Speak text="The guesses are in!" />
          <p style={{ fontSize: "1.5em" }}>The guesses are in...</p>
        </>
      );
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
          handsFreeMode={handsFreeMode}
        />
      );
    } else if (state === "intermediary-leaderboard") {
      return (
        <HostIntLeaderBoard
          gameId={gameId}
          socket={socket}
          playerScores={playerScores}
          handsFreeMode={handsFreeMode}
        />
      );
    } else if (state === "pre-leader-board") {
      return (
        <>
          <Speak text="Let's see who won" cloud={true} />
          <p style={{ fontSize: "1.5em" }}>Let's see who won...</p>
        </>
      );
    } else if (state === "leader-board") {
      return <HostLeaderBoard playerScores={playerScores} socket={socket} />;
    } else if (state === "settings" || settingsState === true) {
      return (
        <HostSettings
          socket={socket}
          gameId={gameId}
          preSettingsId={preSettingsId}
          settingsState={settingsState}
          playersInGame={playersInGame}
          timePerQuestionSetting={timePerQuestion}
          numQuestionnaireQuestionsSetting={numQuestionnaireQuestions}
          numQuizQuestionsSetting={numQuizQuestions}
          handsFreeModeSetting={handsFreeMode}
          timePerAnswerSetting={timePerAnswer}
          timePerLeaderboardSetting={timePerLeaderboard}
          prioritizeCustomQsSetting={prioritizeCustomQs}
          customQuestionsSetting={customQuestions}
        />
      );
    } else if (state == "tiebreaker") {
      return <HostTiebreaker />;
    } else {
      return <HostOpen socket={socket} />;
    }
  }

  return (
    <div className="scroll host-screen">
      <AddAnnouncementContext.Provider value={addAnnouncement}>
        <HostAnnouncementQueue
          announcementAudioObjects={announcementAudioObjects}
          socket={socket}
          gameId={gameId}
          gameState={gameState}
        />
        <PlayAudio src={lobbyMusic} loop={true} />
        <div id="host-banner">
          <div className="musicButton bannerEdge">
            <IconButton onClick={() => muteMusic(muted)}>
              <img
                className="musicIcon"
                src={
                  localStorage.getItem("Music-Playing")
                    ? localStorage.getItem("Music-Playing") === "true"
                      ? musicOn
                      : musicOff
                    : muted
                    ? musicOff
                    : musicOn
                }
              />
            </IconButton>
          </div>
          <div className="banner-text">friendivia</div>
          <div className="bannerEdge">
            {/* Empty to take up space on the right side of the header*/}
          </div>
        </div>
        <div className="host-content">
          {getElementForState(gameState, settingsState)}
        </div>
        <div className="host-footer">
          {gameState !== "init" &&
            <Button
              variant="contained"
              onClick={onEndGameClicked}
              sx={{
                background: "#8080ff",
                textTransform: "lowercase",
                fontFamily: `"Concert One", sans-serif`,
                "&:hover": {
                  background: "#7070ff"
                },
              }}
            >
              end game
            </Button>}
        </div>
      </AddAnnouncementContext.Provider>
    </div>
  );
}
