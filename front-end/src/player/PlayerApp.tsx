import React from "react";
import PlayerJoin from "./PlayerJoin";
import { Socket } from "socket.io-client";
import PlayerQuestionnaire from "./PlayerQuestionnaire";
import PlayerQuizQuestion from "./PlayerQuizQuestion";
import PlayerWait from "./PlayerWait";
import { Chip, Menu, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import PlayerCorrect from "./PlayerCorrect";
import PlayerIncorrect from "./PlayerIncorrect";
import PlayerIsSubject from "./PlayerIsSubject";
import PlayerRanOutOfTime from "./PlayerRanOutOfTime";
import PlayerOver from "./PlayerOver";
import { Button } from "../extra/FrdvButton";
import PlayerNewRanking from "./PlayerNewRanking";
import PlayerKicked from "./PlayerKicked";
import IQuizOption from "back-end/interfaces/IQuizOption";

interface PlayerAppProps {
  socket: Socket;
}

export default function PlayerApp(props: PlayerAppProps) {
  const playerIdFromStorage = localStorage.getItem("player-id") || "";
  const [playerState, setPlayerState] = React.useState("");
  const [playerName, setPlayerName] = React.useState("");
  const [playerScore, setPlayerScore] = React.useState(0);
  const [scoreDiff, setScoreDiff] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [allPlayerScores, setAllPlayerScores] = React.useState([]);
  const [
    questionnaireQuestionsText,
    setQuestionnaireQuestionsText,
  ] = React.useState<string[]>([]);
  const [quizQuestionOptionsText, setQuizQuestionOptionsText] = React.useState<
    IQuizOption[]
  >([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const { socket } = props;

  var bottomButtons;

  if (!loaded) {
    socket.emit("player-load", playerIdFromStorage);
  }

  React.useEffect(() => {
    function onLoadSuccess(data: any) {
      setLoaded(true);
      setPlayerState(data.player.playerState.state);
      setPlayerName(data.player.name);

      setScoreDiff(data.player.score - playerScore);
      setPlayerScore(data.player.score);

      if (data && data.extraData && data.extraData.playerScores) {
        setAllPlayerScores(data.extraData.playerScores);
      }

      if (data && data.extraData && data.extraData.questionnaireQuestionsText) {
        setQuestionnaireQuestionsText(
          data.extraData.questionnaireQuestionsText
        );
      }

      if (data && data.extraData && data.extraData.quizQuestionOptionsText) {
        setQuizQuestionOptionsText(data.extraData.quizQuestionOptionsText);
      }
    }

    function onPlayerGameEnded() {
      localStorage.setItem("player-id", "");
      window.location.reload();
    }

    socket.on("player-game-ended", onPlayerGameEnded)
    socket.on("player-load-success", onLoadSuccess);
    socket.on("player-next", onLoadSuccess);

    return () => {
      socket.off("player-load-success", onLoadSuccess);
      socket.off("player-next", onLoadSuccess);
    };
  }, [playerState, setPlayerState]);

  function getElementForState() {
    if (
      playerState === "filling-questionnaire" ||
      playerState === "submitted-questionnaire-waiting"
    ) {
      bottomButtons = false;
      return (
        <PlayerQuestionnaire
          socket={socket}
          playerState={playerState}
          questionnaireQuestionsText={questionnaireQuestionsText}
        />
      );
    } else if (
      playerState === "seeing-question" ||
      playerState === "answered-quiz-question-waiting" ||
      playerState === "question-being-read"
    ) {
      bottomButtons = false;
      return (
        <PlayerQuizQuestion
          socket={socket}
          optionsList={quizQuestionOptionsText}
          playerState={playerState}
        />
      );
    } else if (playerState === "did-not-answer-question-waiting") {
      bottomButtons = false;
      return <PlayerRanOutOfTime />;
    } else if (playerState === "question-about-me") {
      bottomButtons = false;
      return <PlayerIsSubject />;
    } else if (playerState === "seeing-answer-correct") {
      bottomButtons = false;
      return <PlayerCorrect pts={scoreDiff} />;
    } else if (playerState === "seeing-answer-incorrect") {
      bottomButtons = false;
      return <PlayerIncorrect consolationPts={scoreDiff} />;
    } else if (playerState === "seeing-answer") {
      bottomButtons = false;
      return <PlayerIsSubject />;
    } else if (playerState === "seeing-rank") {
      bottomButtons = false;
      return (
        <PlayerNewRanking
          playerScores={allPlayerScores}
          currentPlayerName={playerName}
        />
      );
    } else if (playerState === "pre-leader-board") {
      bottomButtons = false;
      return <PlayerWait message={`Calculating final scores...`} />;
    } else if (playerState === "leader-board") {
      bottomButtons = false;
      return <PlayerOver rank={0} />;
    } else if (playerState === "rank-one") {
      bottomButtons = false;
      return <PlayerOver rank={1} />;
    } else if (playerState === "rank-two") {
      bottomButtons = false;
      return <PlayerOver rank={2} />;
    } else if (playerState === "rank-three") {
      bottomButtons = false;
      return <PlayerOver rank={3} />;
    } else if (playerState === "" || playerState === "init") {
      bottomButtons = true;
      return <PlayerJoin socket={socket} playerState={playerState} />;
    } else if (playerState === "kicked") {
      bottomButtons = true;
      return <PlayerKicked socket={socket} />;
    } else {
      bottomButtons = false;
      return <PlayerJoin socket={socket} playerState={playerState} />;
    }
  }

  function getButtonsForState() {
    if (
      playerState === "init" ||
      playerState === null ||
      playerState === "" ||
      playerState === "kicked"
    ) {
      return (
        <div className="bottomContainer" id="btmContainPlayerApp">
          <p>
            <Button
              className="button"
              id="HostPlayerApp"
              variant="contained"
              sx={{
                m: 2,
                position: "absolute",
                bottom: "10px",
                left: "10px",
              }}
              href="/host"
            >
              host
            </Button>
            <Button
              className="button"
              id="AboutPlayerApp"
              variant="contained"
              sx={{
                m: 2,
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
              href="/about"
            >
              about
            </Button>
          </p>
        </div>
      );
    } else {
      return <div className="bottomContainer" id="btmContainPlayerApp"></div>;
    }
  }

  function getScreenForState() {
    if (
      playerState === "init" ||
      playerState === null ||
      playerState === "" ||
      playerState === "kicked"
    ) {
      return "element";
    } else {
      return "noBtnElement";
    }
  }

  function playerQuit() {
    if (confirm("Are you sure you want to quit?")) {
      localStorage.setItem("player-id", "");
      socket.emit("player-quit");
    }
  }

  return (
    <div
      className={
        playerState != "filling-questionnaire" ? "fillScreen" : "scroll"
      }
      id={
        playerState === "question-about-me" ||
        "answered-quiz-question-waiting" ||
        "did-not-answer-question-waiting" ||
        "seeing-answer" ||
        "seeing-answer-correct" ||
        "seeing-answer-incorrect"
          ? "fixScreen"
          : ""
      }
    >
      <div className="player_join">
        <div
          className="banner"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu
            id="player-menu"
            open={menuOpen}
            anchorEl={document.querySelector("#player-chip")}
            onClose={() => setMenuOpen(false)}
            MenuListProps={{
              'aria-labelledby': 'player-chip'
            }}
          >
            <MenuItem onClick={playerQuit}>Quit</MenuItem>
          </Menu>

          <Grid container spacing={0}>
            <Grid item xs={3}>
              {playerState != "init" && playerState != "kicked" ? (
                <div className="align_center">
                  {/*if player name has not been inputted do not display username chip*/}
                  {playerName != "" ? (
                    <Chip
                      style={{
                        backgroundColor: "white",
                        marginTop: "1.8em",
                      }}
                      onClick={() => setMenuOpen(!menuOpen)}
                      label={playerName}
                      id="player-chip"
                      aria-controls={menuOpen ? 'player-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={menuOpen ? 'true' : undefined}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={6}>
              <div className="align_center banner-text player-banner-text">friendivia</div>
            </Grid>
            <Grid item xs={3}>
              {/*if player name has not been inputted do not display score chip*/}
              {playerState != "init" ? (
                <div className="align_center">
                  {playerState != "filling-questionnaire" &&
                  playerState != "kicked" ? (
                    playerName != "" ? (
                      <Chip
                        style={{
                          backgroundColor: "white",
                          marginTop: "1.8em",
                        }}
                        label={playerScore}
                      />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </div>
        <div className={getScreenForState()}>{getElementForState()}</div>
        {getButtonsForState()}
      </div>
    </div>
  );
}
