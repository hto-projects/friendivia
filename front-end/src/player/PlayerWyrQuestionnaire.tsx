import * as React from "react";
import "../style.css";
import { Socket } from "socket.io-client";
import PlayerWyrQuestionnaireForm from "./PlayerWyrQuestionnaireForm";

interface IWyrQuestionnaireProps {
  socket: Socket;
  playerState: string;
  wyrQuestion: string;
  wyrA: string;
  wyrB: string;
}

export default function PlayerQuestionnaire(props: IWyrQuestionnaireProps) {
  const { socket, playerState, wyrQuestion, wyrA, wyrB } = props;
  const [
    questionnairePlayerState,
    setQuestionnairePlayerState,
  ] = React.useState({
    state: playerState,
    message: "",
  });

  React.useEffect(() => {
    function onSubmitQuestionnaireSuccess() {
      setQuestionnairePlayerState({
        state: "submitted-wyr-questionnaire",
        message: "",
      });
    }

    function onSubmitQuestionnaireError(errorMsg: string) {
      setQuestionnairePlayerState({
        state: "filling-wyr-questionnaire",
        message: errorMsg,
      });
    }

    socket.on(
      "player-submit-wyr-questionnaire-success",
      onSubmitQuestionnaireSuccess
    );
    socket.on(
      "player-submit-wyr-questionnaire-error",
      onSubmitQuestionnaireError
    );

    return () => {
      socket.off(
        "player-submit-wyr-questionnaire-success",
        onSubmitQuestionnaireSuccess
      );
      socket.off(
        "player-submit-wyr-questionnaire-error",
        onSubmitQuestionnaireError
      );
    };
  }, [questionnairePlayerState, setQuestionnairePlayerState]);

  return (
    <PlayerWyrQuestionnaireForm
      socket={socket}
      playerState={questionnairePlayerState}
      wyrQuestion={wyrQuestion}
      wyrA={wyrA}
      wyrB={wyrB}
    />
  );
}
