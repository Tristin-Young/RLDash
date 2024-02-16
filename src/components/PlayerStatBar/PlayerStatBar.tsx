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
  StatsContainer,
} from "./PlayerStatBar.style";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import PlayerStatBarPNG from '../../assets/PlayerStats.png';


export const PlayerStatBar = () => {
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext

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
  const spectatedPlayer = gameService.getPlayerFromTarget(
    gameInfo.players,
    gameInfo.target
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
          <StatBarStatValue>{spectatedPlayer.score}</StatBarStatValue>
          <StatBarStatName>SCORE</StatBarStatName>
        </StatBarStatPair>
        <Divider />
        <StatBarStatPair>
          {/* <StatBarStatValue>12</StatBarStatValue> */}
          <StatBarStatValue>{spectatedPlayer.goals}</StatBarStatValue>
          <StatBarStatName>GOALS</StatBarStatName>
        </StatBarStatPair>
        <Divider />
        <StatBarStatPair>
          {/* <StatBarStatValue>16</StatBarStatValue> */}
          <StatBarStatValue>{spectatedPlayer.shots}</StatBarStatValue>
          <StatBarStatName>SHOTS</StatBarStatName>
        </StatBarStatPair>
        <Divider />
        <StatBarStatPair>
          {/* <StatBarStatValue>18</StatBarStatValue> */}
          <StatBarStatValue>{spectatedPlayer.assists}</StatBarStatValue>
          <StatBarStatName>ASSISTS</StatBarStatName>
        </StatBarStatPair>
        <Divider />
        <StatBarStatPair>
          {/* <StatBarStatValue>21</StatBarStatValue> */}
          <StatBarStatValue>{spectatedPlayer.saves}</StatBarStatValue>
          <StatBarStatName>SAVES</StatBarStatName>
        </StatBarStatPair>
      </StatsContainer>
    </StatBarWrapper>
   )}
</>

  );
};
