//PlayerStatBar.tsx
import { useContext, useEffect } from "react";
import { gameService } from "../../services/gameService";
import {
  GreyBoostBar,
  // Divider,
  PlayerName,
  StatBarStatName,
  StatBarStatPair,
  StatBarStatValue,
  StatBarWrapper,
  StatsContainer,
  BoostBarContainer,
  BlueBoostBar,
  PlayerBoostValue,
  ScorebugCreatorBanner,
} from "./PlayerStatBar.style";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import PlayerStatBarBluePNG from "../../assets/PlayerStats-Blue.png";
import PlayerStatBarOrangePNG from "../../assets/PlayerStats-Orange.png";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { USPlayer } from "../../models/USPlayer";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";

export const PlayerStatBar = () => {
  const { updateState, setUpdateState } = useContext(UpdateStateContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext
  const { controlPanelSettings } = useContext(ControlPanelSettingsContext);

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
          <BoostBarContainer>
            <GreyBoostBar />
            <BlueBoostBar
              boost={Number(spectatedPlayer.boost)}
              color={
                spectatedPlayer.team === 0
                  ? controlPanelSettings.blueTeamColor
                  : controlPanelSettings.orangeTeamColor
              }
            />
          </BoostBarContainer>
          {spectatedPlayer.team === 0 ? (
            <img src={PlayerStatBarBluePNG} alt="PlayerStatBar" />
          ) : (
            <img src={PlayerStatBarOrangePNG} alt="PlayerStatBar" />
          )}

          {/* <PlayerName>Mountailously</PlayerName> */}
          <PlayerName>{spectatedPlayer.name}</PlayerName>
          {/* <PlayerName>REALLYLONGNAME</PlayerName> */}
          <StatsContainer>
            <StatBarStatPair>
              {/* <StatBarStatValue>1234&nbsp;</StatBarStatValue> */}
              <StatBarStatValue>{spectatedPlayer.score}&nbsp;</StatBarStatValue>
              <StatBarStatName>SCORE</StatBarStatName>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>12&nbsp;</StatBarStatValue> */}
              <StatBarStatValue>{spectatedPlayer.goals}&nbsp;</StatBarStatValue>
              <StatBarStatName>GOALS</StatBarStatName>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>16&nbsp;</StatBarStatValue> */}
              <StatBarStatValue>{spectatedPlayer.shots}&nbsp;</StatBarStatValue>
              <StatBarStatName>SHOTS</StatBarStatName>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>18&nbsp;</StatBarStatValue> */}
              <StatBarStatValue>
                {spectatedPlayer.assists}&nbsp;
              </StatBarStatValue>
              <StatBarStatName>ASST</StatBarStatName>
            </StatBarStatPair>
            {/* <Divider /> */}
            <StatBarStatPair>
              {/* <StatBarStatValue>21&nbsp;</StatBarStatValue> */}
              <StatBarStatValue>{spectatedPlayer.saves}&nbsp;</StatBarStatValue>
              <StatBarStatName>SAVES</StatBarStatName>
            </StatBarStatPair>
          </StatsContainer>
          <PlayerBoostValue>{spectatedPlayer.boost}</PlayerBoostValue>
          <ScorebugCreatorBanner>
            {controlPanelSettings.bottomCreatorBannerMessage}
          </ScorebugCreatorBanner>
        </StatBarWrapper>
      )}
    </>
  );
};
