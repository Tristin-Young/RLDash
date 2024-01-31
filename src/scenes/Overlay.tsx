// Overlay.tsx
import React, { useContext, useEffect } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";
import { GameInfoContext } from "../contexts/GameInfoContext";
import { Scorebug } from "../components/Scorebug/Scorebug";
import { PlayerStatBar } from "../components/PlayerStatBar/PlayerStatBar";
import { PlayerBoostMeter } from "../components/PlayerBoostMeter/PlayerBoostMeter";
import { PlayerTeamName } from "../components/PlayerTeamNames/PlayerTeamName";
import { transformGameUpdate } from "../contexts/transformGameUpdate";

export const Overlay = () => {
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
        console.log("innerMessage:", innerMessage);
        const gameContext = transformGameUpdate(innerMessage);
        console.log("gameContext:", gameContext);
        setGameInfo(gameContext);
    };

    // Subscribe and get the unsubscribe function
    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
        unsubscribe(); // Call the unsubscribe function on cleanup
    };
}, [subscribe, setGameInfo]);

  return (
    <>
      <Scorebug />
      <PlayerStatBar />
      <PlayerBoostMeter />
      <PlayerTeamName />
    </>
  );
};

