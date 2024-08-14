import { useContext, useEffect } from "react";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export const UpdateSeriesScore = () => {
  const { updateState } = useContext(UpdateStateContext);
  const { controlPanelSettings, setControlPanelSettings, updateSettings } =
    useContext(ControlPanelSettingsContext);
  const { subscribe } = useContext(WebsocketContext);

  useEffect(() => {
    const handleMVPEvent = () => {
      //console.log("MVP event received. Updating series score...");

      const blueScore = updateState.game.teams[0].score;
      const orangeScore = updateState.game.teams[1].score;
      if (
        controlPanelSettings.blueWins + controlPanelSettings.orangeWins + 1 >=
        controlPanelSettings.NumberOfGames
      ) {
        // This was the last game of the series
        setControlPanelSettings((prevSettings) => ({
          ...prevSettings,
          blueWins: 0,
          orangeWins: 0,
        }));
        //updateSettings(controlPanelSettings);
      } else if (blueScore > orangeScore) {
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
    };

    const unsubscribe = subscribe("game:statfeed_event_MVP", handleMVPEvent);

    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  return null; // This component doesn't render anything
};
