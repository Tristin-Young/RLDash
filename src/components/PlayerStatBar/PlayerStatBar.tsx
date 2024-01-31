import { useContext, useEffect } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { gameService } from "../../services/gameService";
import {
    Divider,
  PlayerName,
  StatBarStatName,
  StatBarStatPair,
  StatBarStatValue,
  StatBarWrapper,
} from "./PlayerStatBar.style";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";

export const PlayerStatBar = () => {
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
  const spectatedPlayer = gameService.getPlayerFromTarget(
    gameInfo.players,
    gameInfo.target
  );
  const PlayerTeam = spectatedPlayer?.team === 0 ? "blue" : "orange";
  return (
    <>
      {spectatedPlayer && (
        <StatBarWrapper
          style={{
            backgroundColor: PlayerTeam === "blue" ? "lightblue" : "#FFD580",
          }}
        >
          <PlayerName>{spectatedPlayer.name}</PlayerName>
          <Divider />
          <StatBarStatPair>
            <StatBarStatValue>{spectatedPlayer.score}</StatBarStatValue>
            <StatBarStatName>SCORE</StatBarStatName>
          </StatBarStatPair>
          <Divider />
          <StatBarStatPair>
            <StatBarStatValue>{spectatedPlayer.goals}</StatBarStatValue>
            <StatBarStatName>GOALS</StatBarStatName>
          </StatBarStatPair>
          <Divider />
          <StatBarStatPair>
            <StatBarStatValue>{spectatedPlayer.shots}</StatBarStatValue>
            <StatBarStatName>SHOTS</StatBarStatName>
          </StatBarStatPair>
          <Divider />
          <StatBarStatPair>
            <StatBarStatValue>{spectatedPlayer.assists}</StatBarStatValue>
            <StatBarStatName>ASSISTS</StatBarStatName>
          </StatBarStatPair>
          <Divider />
          <StatBarStatPair>
            <StatBarStatValue>{spectatedPlayer.saves}</StatBarStatValue>
            <StatBarStatName>SAVES</StatBarStatName>
          </StatBarStatPair>
        </StatBarWrapper>
      )}
    </>
  );
};
