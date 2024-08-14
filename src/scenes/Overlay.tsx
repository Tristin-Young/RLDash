import React, { useContext, useEffect } from "react";
import { ControlPanelSettingsContext } from "../contexts/ControlPanelSettingsContext";
import { UpdateStateContext } from "../contexts/UpdateStateContext";
import { Scorebug } from "../components/Scorebug/Scorebug";
import { PlayerStatBar } from "../components/PlayerStatBar/PlayerStatBar";
import { PlayerBoostMeter } from "../components/PlayerBoostMeter/PlayerBoostMeter";
import { PlayerTeamName } from "../components/PlayerTeamNames/PlayerTeamName";
import { transformGameUpdate } from "../contexts/transformGameUpdate";
import { SaveData } from "../components/SaveData/SaveData";
import { UpdateSeriesScore } from "../components/SeriesScore/UpdateSeriesScore";
import { UpdateShowOverlay } from "../components/ShowOverlay/UpdateShowOverlay";

export const Overlay = () => {
  const {
    controlPanelSettings,
    setControlPanelSettings,
    subscribe,
    updateSettings,
  } = useContext(ControlPanelSettingsContext);
  const { setUpdateState } = useContext(UpdateStateContext);

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      if (innerMessage.event === "gamestate") {
        const gameContext = transformGameUpdate(innerMessage);
        setUpdateState(gameContext);
      }
    };

    const handleLoadSettings = (data: any) => {
      console.log("OVERLAY.TSX>>Loaded Control Panel Settings");
      setControlPanelSettings(data);
    };

    const handleUpdateSettings = (data: any) => {
      console.log("OVERLAY.TSX>>Updating Control Panel Settings");
      setControlPanelSettings(data);
      //updateSettings(data);
    };

    // Load initial settings when the overlay component mounts
    const unsubscribeLoadSettings = subscribe(
      "loadSettings",
      handleLoadSettings
    );

    // Subscribing to the "gamestate" event using the subscribe function provided by the context
    const unsubscribeGameUpdate = subscribe("gamestate", handleGameUpdate);
    const unsubscribeUpdateSettings = subscribe(
      "updateSettings",
      handleUpdateSettings
    );

    // Clean up subscriptions when the component unmounts
    return () => {
      unsubscribeLoadSettings();
      unsubscribeGameUpdate();
      unsubscribeUpdateSettings();
    };
  }, [subscribe, setUpdateState, setControlPanelSettings]);

  return (
    <>
      <Scorebug />
      <PlayerStatBar />
      <PlayerBoostMeter />
      <PlayerTeamName />
      <SaveData />
      <UpdateSeriesScore />
      <UpdateShowOverlay />
    </>
  );
};
