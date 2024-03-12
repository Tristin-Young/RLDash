import {
  useContext,
  useEffect,
  useState,
  // useState,
} from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";
// import { Player as WebSocketPlayer } from "../../models/UpdateState/PluginPlayer";
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
import FlipIconPNG from "../../assets/flipIcon.png";
import FlipIconMirroredPNG from "../../assets/flipIconMirrored.png";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { USPlayer } from "../../models/USPlayer";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { FlipIconSVG, MirroredFlipIconSVG } from "./FlipIconSVG";

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
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  const { subscribe } = useContext(WebsocketContext);
  const [playerData, setPlayerData] = useState<PlayerData>({});
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    // Create WebSocket connection.
    const ws = new WebSocket("ws://localhost:43003");

    // Connection opened
    ws.addEventListener("open", (event) => {
      console.log("Connected to Flip Plugin server");
    });

    // Listen for messages
    ws.addEventListener("message", (event) => {
      const receivedData: ReceivedData = JSON.parse(event.data); // Assuming receivedData is structured as described
      const newData: PlayerData = {}; // Add type annotation for newData
      Object.entries(receivedData.teams).forEach(
        ([teamKey, teamPlayers]: [string, any]) => {
          // Note: Now iterating over an object of players directly under each team
          Object.values(teamPlayers).forEach((player: any) => {
            newData[player.name] = {
              ...player,
              hasFlip: player.hasFlip,
              numWheelsOnGround: player.numWheelsOnGround,
              timeOffGround: player.timeOffGround,
              isDodging: player.isDodging,
            };
          });
        }
      );

      setPlayerData(newData);
      // setGameData(receivedData);
    });

    return () => {
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, []);

  useEffect(() => {
    // Logic that should run when controlPanelSettings changes
    //console.log("Updated settings:", controlPanelSettings);
  }, [controlPanelSettings]);

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:42000");

    webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (
        message.type === "loadSettings" ||
        message.type === "updateSettings"
      ) {
        setControlPanelSettings(message.data); // Update local state with new settings
      }
    };

    return () => {
      if (webSocket.readyState === WebSocket.OPEN) webSocket.close();
    };
  }, []);

  //Function to determine the correct filter for the flip icon
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

  //function to remove trailing numbers from player names
  const removeTrailingNumbers = (name: string) => {
    return name.replace(/\d+$/, "");
  };

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      const gameContext = transformGameUpdate(innerMessage);
      setGameInfo(gameContext);
    };

    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
      unsubscribe();
      // ws.close();
    };
  }, [subscribe, setGameInfo]);

  return (
    <>
      <BlueSvgWrapper>
        <img src={BlueTeamPNG} alt="Blue Players" />
      </BlueSvgWrapper>
      <OrangeSvgWrapper>
        <img src={OrangeTeamPNG} alt="Orange Players" />
      </OrangeSvgWrapper>
      <BlueTeamNamesWrapper>
        {gameInfo.players
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
        {gameInfo.players
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
