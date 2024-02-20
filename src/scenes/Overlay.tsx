// Overlay.tsx
import 
// React, 
{ useContext, useEffect } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";
import { GameInfoContext } from "../contexts/GameInfoContext";
import { ControlPanelSettingsContext } from "../contexts/ControlPanelSettingsContext";
import { Scorebug } from "../components/Scorebug/Scorebug";
import { PlayerStatBar } from "../components/PlayerStatBar/PlayerStatBar";
import { PlayerBoostMeter } from "../components/PlayerBoostMeter/PlayerBoostMeter";
import { PlayerTeamName } from "../components/PlayerTeamNames/PlayerTeamName";
import { transformGameUpdate } from "../contexts/transformGameUpdate";

export const Overlay = () => {
  const { setGameInfo } = useContext(GameInfoContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext
  const { controlPanelSettings } = useContext(ControlPanelSettingsContext);

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
        //console.log("innerMessage:", innerMessage);
        const gameContext = transformGameUpdate(innerMessage);
        //console.log("gameContext:", gameContext);
        setGameInfo(gameContext);
    };

    // Subscribe and get the unsubscribe function
    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
        unsubscribe(); // Call the unsubscribe function on cleanup
    };
}, [subscribe, setGameInfo]);

useEffect(() => {
  // Logic that should run when controlPanelSettings changes
  //console.log("Updated settings:", controlPanelSettings);
}, [controlPanelSettings]);

  return (
    <>
      <Scorebug />
      <PlayerStatBar />
      <PlayerBoostMeter />
      <PlayerTeamName />
    </>
  );
};

