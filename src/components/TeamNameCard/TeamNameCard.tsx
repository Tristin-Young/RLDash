import { useContext, useEffect } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { gameService } from "../../services/gameService";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { USPlayer } from "../../models/USPlayer";

export const TeamNameCard = () => {
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
        <div>
          <p>{spectatedPlayer.name}</p>
        </div>
      )}
    </>
  );
};
