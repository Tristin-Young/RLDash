//PlayerStatBar.tsx
import { useContext, useEffect } from "react";
import { gameService } from "../../services/gameService";
import {
  // Divider,
  PlayerName,
  StatBarStatName,
  StatBarStatPair,
  StatBarStatValue,
  StatBarWrapper,
  StatsContainer,
} from "./PlayerStatBar.style";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import PlayerStatBarPNG from "../../assets/PlayerStats.png";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { USPlayer } from "../../models/USPlayer";

export const PlayerStatBar = () => {
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
        <StatBarWrapper>
          <img src={PlayerStatBarPNG} alt="PlayerStatBar" />
          {/* <PlayerName>Mountailously</PlayerName> */}
          <PlayerName>{spectatedPlayer.name}</PlayerName>
          <StatsContainer>
            <StatBarStatPair>
              {/* <StatBarStatValue>1234</StatBarStatValue> */}
              <StatBarStatValue>{spectatedPlayer.score}&nbsp;</StatBarStatValue>
              <StatBarStatName>SCORE</StatBarStatName>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>12</StatBarStatValue> */}
              <StatBarStatValue>{spectatedPlayer.goals}&nbsp;</StatBarStatValue>
              <StatBarStatName>GOALS</StatBarStatName>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>16</StatBarStatValue> */}
              <StatBarStatValue>{spectatedPlayer.shots}&nbsp;</StatBarStatValue>
              <StatBarStatName>SHOTS</StatBarStatName>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>18</StatBarStatValue> */}
              <StatBarStatValue>
                {spectatedPlayer.assists}&nbsp;
              </StatBarStatValue>
              <StatBarStatName>ASSISTS</StatBarStatName>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>21</StatBarStatValue> */}
              <StatBarStatValue>{spectatedPlayer.saves}&nbsp;</StatBarStatValue>
              <StatBarStatName>SAVES</StatBarStatName>
            </StatBarStatPair>
          </StatsContainer>
        </StatBarWrapper>
      )}
    </>
  );
};
