import { useContext, useEffect } from "react";
import { gameService } from "../../services/gameService";
import {
  StatCardContainer,
  StatCardStatName,
  StatCardStatValue,
  StatCardWrapper,
} from "./PlayerStatCard.style";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { USPlayer } from "../../models/USPlayer";

export const PlayerStatCard = () => {
  const { updateState, setUpdateState } = useContext(UpdateStateContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      if (innerMessage.event === "gamestate") {
        const gameContext = transformGameUpdate(innerMessage);
        setUpdateState(gameContext);
      }
    };

    // Subscribe and get the unsubscribe function
    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
      unsubscribe(); // Call the unsubscribe function on cleanup
    };
  }, [subscribe, setUpdateState]);
  const spectatedPlayer = gameService.getPlayerFromTarget(
    updateState.players as USPlayer[],
    updateState.game.target
  );
  return (
    <>
      {spectatedPlayer && (
        <StatCardWrapper>
          <p>{spectatedPlayer.name}</p>
          <StatCardContainer>
            <div>
              <StatCardStatName>GOALS</StatCardStatName>
              <StatCardStatValue>{spectatedPlayer.goals}</StatCardStatValue>
            </div>
            <div style={{ marginLeft: "40px" }}>
              <StatCardStatName>ASSISTS</StatCardStatName>
              <StatCardStatValue>{spectatedPlayer.assists}</StatCardStatValue>
            </div>
            <div style={{ marginLeft: "40px" }}>
              <StatCardStatName>SAVES</StatCardStatName>
              <StatCardStatValue>{spectatedPlayer.saves}</StatCardStatValue>
            </div>
            <div style={{ marginLeft: "40px" }}>
              <StatCardStatName>SHOTS</StatCardStatName>
              <StatCardStatValue>{spectatedPlayer.shots}</StatCardStatValue>
            </div>
          </StatCardContainer>
        </StatCardWrapper>
      )}
    </>
  );
};
