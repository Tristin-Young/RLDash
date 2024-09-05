import { useContext, useEffect } from "react";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export const UpdateSeriesScore = () => {
  const { updateState } = useContext(UpdateStateContext);
  const { setControlPanelSettings, updateSettings } = useContext(
    ControlPanelSettingsContext
  );
  const { subscribe } = useContext(WebsocketContext);

  useEffect(() => {
    const handleMVPEvent = () => {
      const blueScore = updateState.game.teams[0].score;
      const orangeScore = updateState.game.teams[1].score;

      setControlPanelSettings((prevSettings) => {
        const updatedSettings = { ...prevSettings };

        if (blueScore > orangeScore) {
          if (
            updatedSettings.blueWins + 1 >=
            Math.floor(updatedSettings.NumberOfGames / 2) + 1
          ) {
            updatedSettings.blueWins = 0;
            updatedSettings.orangeWins = 0;
          } else {
            updatedSettings.blueWins += 1;
          }
        } else if (orangeScore > blueScore) {
          if (
            updatedSettings.orangeWins + 1 >=
            Math.floor(updatedSettings.NumberOfGames / 2) + 1
          ) {
            updatedSettings.blueWins = 0;
            updatedSettings.orangeWins = 0;
          } else {
            updatedSettings.orangeWins += 1;
          }
        }

        updateSettings(updatedSettings); // Always use the latest state for update
        return updatedSettings;
      });
    };

    const unsubscribe = subscribe("game:statfeed_event_MVP", handleMVPEvent);

    return () => {
      unsubscribe();
    };
  }, [subscribe, updateState, setControlPanelSettings, updateSettings]);

  return null;
};
