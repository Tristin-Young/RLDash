//Overlay.tsx
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

export const Overlay = () => {
  const { controlPanelSettings, setControlPanelSettings, subscribe } =
    useContext(ControlPanelSettingsContext);
  const { setUpdateState } = useContext(UpdateStateContext);

  useEffect(() => {
    //console.log("Overlay settings updated:", controlPanelSettings);
  }, [controlPanelSettings]);

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      if (innerMessage.event === "gamestate") {
        const gameContext = transformGameUpdate(innerMessage);
        setUpdateState(gameContext);
      }
    };

    const handleUpdateSettings = (data: any) => {
      //console.log("Overlay updateSettings received:", data);
      setControlPanelSettings(data);
    };

    const unsubscribeGameUpdate = subscribe("gamestate", handleGameUpdate);
    const unsubscribeUpdateSettings = subscribe(
      "updateSettings",
      handleUpdateSettings
    );

    return () => {
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
    </>
  );
};
