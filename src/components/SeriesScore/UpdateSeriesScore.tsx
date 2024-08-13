import { useContext, useEffect } from "react";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export const UpdateSeriesScore = () => {
  const { updateState } = useContext(UpdateStateContext);
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const { subscribe } = useContext(WebsocketContext);

  useEffect(() => {
    const handleMVPEvent = (innerMessage: any) => {
      if (innerMessage.data.type === "MVP") {
        //console.log("MVP event received. Updating series score...");

        const blueScore = updateState.game.teams[0].score;
        const orangeScore = updateState.game.teams[1].score;

        if (blueScore > orangeScore) {
          // Blue team wins the game
          setControlPanelSettings((prevSettings) => ({
            ...prevSettings,
            blueWins: prevSettings.blueWins + 1,
          }));
        } else if (orangeScore > blueScore) {
          // Orange team wins the game
          setControlPanelSettings((prevSettings) => ({
            ...prevSettings,
            orangeWins: prevSettings.orangeWins + 1,
          }));
        }
      }
    };

    const unsubscribe = subscribe("game:statfeed_event_MVP", handleMVPEvent);

    return () => {
      unsubscribe();
    };
  }, [subscribe, updateState, setControlPanelSettings]);

  return null; // This component doesn't render anything
};
