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
      console.log(
        "UPDATESERIESSCORE>> MVP event received. Updating series score..."
      );

      const blueScore = updateState.game.teams[0].score;
      const orangeScore = updateState.game.teams[1].score;

      if (blueScore > orangeScore) {
        // Blue team wins the game
        setControlPanelSettings((prevSettings) => {
          const updatedSettings = { ...prevSettings };

          if (
            prevSettings.blueWins >=
            Math.floor(prevSettings.NumberOfGames / 2) + 1
          ) {
            // This was the last game of the series
            console.log(
              "UPDATESERIESSCORE>> Blue team wins the series!",
              prevSettings.blueWins
            );
            updatedSettings.blueWins = 0;
            updatedSettings.orangeWins = 0;
          } else {
            // This was not the last game of the series
            console.log(
              "UPDATESERIESSCORE>> Blue team wins the game!",
              prevSettings.blueWins
            );
            updatedSettings.blueWins += 1;
          }

          // Call updateSettings with the updated settings
          updateSettings(updatedSettings);
          return updatedSettings;
        });
      } else if (orangeScore > blueScore) {
        // Orange team wins the game
        setControlPanelSettings((prevSettings) => {
          const updatedSettings = { ...prevSettings };

          if (
            prevSettings.orangeWins >=
            Math.floor(prevSettings.NumberOfGames / 2) + 1
          ) {
            // This was the last game of the series
            console.log(
              "UPDATESERIESSCORE>> Orange team wins the series!",
              prevSettings.orangeWins
            );
            updatedSettings.blueWins = 0;
            updatedSettings.orangeWins = 0;
          } else {
            // This was not the last game of the series
            console.log(
              "UPDATESERIESSCORE>> Orange team wins the game!",
              prevSettings.orangeWins
            );
            updatedSettings.orangeWins += 1;
          }

          // Call updateSettings with the updated settings
          updateSettings(updatedSettings);
          return updatedSettings;
        });
      }
    };

    const unsubscribe = subscribe("game:statfeed_event_MVP", handleMVPEvent);

    return () => {
      unsubscribe();
    };
  }, [subscribe, setControlPanelSettings]);

  return null; // This component doesn't render anything
};
