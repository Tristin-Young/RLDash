import { useContext, useEffect } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
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
import OrangePlayerStatBarPNG from "../../assets/BlueFocusedPlayerStats.png";
import BluePlayerStatBarPNG from "../../assets/OrangeFocusedPlayerStats.png";
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
          {spectatedPlayer.team === 1 ? (
            <img src={BluePlayerStatBarPNG} alt="PlayerStatBar" />
          ) : (
            <img src={OrangePlayerStatBarPNG} alt="PlayerStatBar" />
          )}
          {/* <PlayerName>Mountailously</PlayerName> */}
          <PlayerName>{spectatedPlayer.name}</PlayerName>
          <StatsContainer>
            {/* <StatBarStatPair>
              <StatBarStatName>SCORE</StatBarStatName>
              <StatBarStatValue>{spectatedPlayer.score}&nbsp;</StatBarStatValue>
            </StatBarStatPair> */}
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>12</StatBarStatValue> */}
              <StatBarStatName>GOALS</StatBarStatName>
              <StatBarStatValue>{spectatedPlayer.goals}&nbsp;</StatBarStatValue>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>16</StatBarStatValue> */}
              <StatBarStatName>SHOTS</StatBarStatName>
              <StatBarStatValue>{spectatedPlayer.shots}&nbsp;</StatBarStatValue>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>18</StatBarStatValue> */}
              <StatBarStatName>ASST</StatBarStatName>
              <StatBarStatValue>
                {spectatedPlayer.assists}&nbsp;
              </StatBarStatValue>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>21</StatBarStatValue> */}
              <StatBarStatName>SAVES</StatBarStatName>
              <StatBarStatValue>{spectatedPlayer.saves}&nbsp;</StatBarStatValue>
            </StatBarStatPair>
          </StatsContainer>
        </StatBarWrapper>
      )}
    </>
  );
};
