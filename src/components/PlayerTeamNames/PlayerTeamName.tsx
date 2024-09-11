import React, { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import {
  BlueBoostBar,
  BlueSvgWrapper,
  BlueTeamNamesWrapper,
  BoostBarContainer,
  FlipIconSvgWrapper,
  GreyBoostBar,
  GreyBoostBarOrange,
  OrangeBoostBar,
  OrangeBoostBarContainer,
  OrangeFlipIconSvgWrapper,
  OrangePlayerAndFlipIconContainer,
  OrangePlayerBoost,
  OrangePlayerContainer,
  OrangePlayerName,
  OrangePlayerNameAndBoostContainer,
  OrangeSvgWrapper,
  OrangeTeamNamesWrapper,
  PlayerAndFlipIconContainer,
  PlayerBoost,
  PlayerContainer,
  PlayerName,
  PlayerNameAndBoostContainer,
} from "./PlayerTeamName.style";
import BlueTeamPNG from "../../assets/BlueTeam.png";
import OrangeTeamPNG from "../../assets/OrangeTeam.png";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { USPlayer } from "../../models/USPlayer";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { FlipIconSVG, MirroredFlipIconSVG } from "./FlipIconSVG";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";

interface PlayerData {
  [key: string]: {
    name: string;
    numWheelsOnGround: number;
    timeOffGround: number;
    isDodging: string;
  };
}

interface TeamData {
  players: Array<{
    name: string;
    numWheelsOnGround: number;
    timeOffGround: number;
    isDodging: string;
  }>;
}

interface ReceivedData {
  teams: {
    [key: string]: TeamData;
  };
}

export const PlayerTeamName = () => {
  const { updateState, setUpdateState } = useContext(UpdateStateContext);
  const { subscribe } = useContext(WebsocketContext);
  const [playerData, setPlayerData] = useState<PlayerData>({});
  const { controlPanelSettings } = useContext(ControlPanelSettingsContext);

  useEffect(() => {
    const handlePlayerDataUpdate = (receivedData: ReceivedData) => {
      // console.log("Received data:", receivedData);
      const newData: PlayerData = {};
      Object.entries(receivedData.teams).forEach(
        ([teamKey, teamData]: [string, TeamData]) => {
          teamData.players.forEach((player) => {
            // console.log("Player:", player);
            newData[player.name] = {
              name: player.name,
              numWheelsOnGround: player.numWheelsOnGround,
              timeOffGround: player.timeOffGround,
              isDodging: player.isDodging,
            };
          });
        }
      );
      setPlayerData(newData);
    };

    const unsubscribe = subscribe("game:update_state", handlePlayerDataUpdate);

    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  useEffect(() => {
    //console.log("Updated settings:", controlPanelSettings);
  }, [controlPanelSettings]);

  const getFilter = (player: USPlayer) => {
    const isOnGround = player.onGround;
    const isOnWall = player.onWall;
    const numWheelsOnGround = playerData[player.name]?.numWheelsOnGround;
    const timeOffGround = playerData[player.name]?.timeOffGround;
    const isDodging = playerData[player.name]?.isDodging;
    if (isOnGround || isOnWall || numWheelsOnGround === 4) {
      return player.team === 0
        ? controlPanelSettings.blueTeamFlipColor
        : controlPanelSettings.orangeTeamFlipColor;
    } else if (!isDodging && timeOffGround < 1.45) {
      return player.team === 0
        ? controlPanelSettings.blueTeamFlipColor
        : controlPanelSettings.orangeTeamFlipColor;
    } else {
      return controlPanelSettings.flipUnavailableColor;
    }
  };

  const removeTrailingNumbers = (name: string) => {
    return name.replace(/\d+$/, "");
  };

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      if (innerMessage.event === "gamestate") {
        const gameContext = transformGameUpdate(innerMessage);
        setUpdateState(gameContext);
      }
    };

    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
      unsubscribe();
    };
  }, [subscribe, setUpdateState]);

  return (
    <>
      <BlueSvgWrapper>
        <img src={BlueTeamPNG} alt="Blue Players" />
      </BlueSvgWrapper>
      <OrangeSvgWrapper>
        <img src={OrangeTeamPNG} alt="Orange Players" />
      </OrangeSvgWrapper>
      <BlueTeamNamesWrapper>
        {updateState.players
          .filter((p) => p.team === 0)
          .map((player, index) => (
            <PlayerAndFlipIconContainer key={index}>
              <PlayerContainer>
                <PlayerNameAndBoostContainer>
                  <PlayerName>{removeTrailingNumbers(player.name)}</PlayerName>
                  <PlayerBoost>{player.boost}</PlayerBoost>
                </PlayerNameAndBoostContainer>
                <BoostBarContainer>
                  <GreyBoostBar />
                  <BlueBoostBar
                    boost={Number(player.boost)}
                    index={index}
                    color={controlPanelSettings.blueTeamColor}
                  />
                </BoostBarContainer>
              </PlayerContainer>
              <FlipIconSvgWrapper>
                {controlPanelSettings.showFlipResets === true && (
                  <FlipIconSVG color={getFilter(player)} />
                )}{" "}
              </FlipIconSvgWrapper>
            </PlayerAndFlipIconContainer>
          ))}
      </BlueTeamNamesWrapper>
      <OrangeTeamNamesWrapper>
        {updateState.players
          .filter((p) => p.team === 1)
          .map((player, index) => (
            <OrangePlayerAndFlipIconContainer key={index}>
              <OrangeFlipIconSvgWrapper>
                {controlPanelSettings.showFlipResets === true && (
                  <MirroredFlipIconSVG color={getFilter(player)} />
                )}
              </OrangeFlipIconSvgWrapper>
              <OrangePlayerContainer>
                <OrangePlayerNameAndBoostContainer>
                  <OrangePlayerBoost>{player.boost}</OrangePlayerBoost>
                  <OrangePlayerName>
                    {removeTrailingNumbers(player.name)}
                  </OrangePlayerName>
                </OrangePlayerNameAndBoostContainer>
                <OrangeBoostBarContainer>
                  <GreyBoostBarOrange />
                  <OrangeBoostBar
                    boost={Number(player.boost)}
                    index={index}
                    color={controlPanelSettings.orangeTeamColor}
                  />
                </OrangeBoostBarContainer>
              </OrangePlayerContainer>
            </OrangePlayerAndFlipIconContainer>
          ))}
      </OrangeTeamNamesWrapper>
    </>
  );
};
