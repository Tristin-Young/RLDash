import { useContext, 
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
  OrangePlayerAndFlipIconContainer,
  OrangePlayerContainer,
  OrangePlayerName,
  OrangePlayerNameAndBoostContainer,
  OrangeSvgWrapper,
  OrangeTeamNamesWrapper,
  PlayerAndFlipIconContainer,
  PlayerContainer,
  PlayerName,
  PlayerNameAndBoostContainer,
} from "./PlayerTeamName.style";
import BlueTeamPNG from "../../assets/BlueTeam.png";
import OrangeTeamPNG from "../../assets/OrangeTeam.png";
import FlipIconPNG from "../../assets/flipIcon.png";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { USPlayer } from "../../models/USPlayer";

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

  useEffect(() => {
    // Create WebSocket connection.
    const ws = new WebSocket('ws://localhost:43003');

    // Connection opened
    ws.addEventListener('open', (event) => {
        console.log('Connected to Flip Plugin server');
    });

    // Listen for messages
    ws.addEventListener('message', (event) => {
      const receivedData = JSON.parse(event.data); // Assuming receivedData is structured as described

      const newData: PlayerData = {}; // Add type annotation for newData
      Object.entries(receivedData.teams).forEach(([teamKey, teamPlayers]: [string, any]) => {
        // Note: Now iterating over an object of players directly under each team
        Object.values(teamPlayers).forEach((player: any) => {
          newData[player.name] = { ...player, hasFlip: player.hasFlip, numWheelsOnGround: player.numWheelsOnGround, timeOffGround: player.timeOffGround, isDodging: player.isDodging};
        });
      });
    
      setPlayerData(newData); 
      });

    return () => {
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, []);

  //Function to determine the correct filter for the flip icon
  const getFilter = (player: USPlayer) => {
    const isOnGround = player.onGround;
    const isOnWall = player.onWall;
    const numWheelsOnGround = playerData[player.name]?.numWheelsOnGround;
    const timeOffGround = playerData[player.name]?.timeOffGround;
    const isDodging = playerData[player.name]?.isDodging;
    // const hasFlip = playerData[player.name]?.hasFlip;
    //console.log(player.name, numWheelsOnGround, timeOffGround, isDodging);
    
    if (isOnGround || isOnWall || numWheelsOnGround === 4){
      return player.team === 0
        ? "invert(77%) sepia(75%) saturate(3420%) hue-rotate(133deg) brightness(104%) contrast(104%)"
        : "invert(55%) sepia(72%) saturate(560%) hue-rotate(347deg) brightness(105%) contrast(92%)";
    } else if(!isDodging && timeOffGround < 1.45){
      return player.team === 0
      ? "invert(77%) sepia(75%) saturate(3420%) hue-rotate(133deg) brightness(104%) contrast(104%)"
      : "invert(55%) sepia(72%) saturate(560%) hue-rotate(347deg) brightness(105%) contrast(92%)";
    }
    else {
      return "invert(51%) sepia(1%) saturate(0%) hue-rotate(353deg) brightness(99%) contrast(87%)";
    }
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
        {gameInfo.players.filter((p) => p.team === 0).map((player, index) => (
          <PlayerAndFlipIconContainer key={index}>
            <PlayerContainer >
              <PlayerNameAndBoostContainer>
                <PlayerName>{player.name}</PlayerName>
              </PlayerNameAndBoostContainer>
              <BoostBarContainer>
                <GreyBoostBar />
                <BlueBoostBar boost={Number(player.boost)} />
              </BoostBarContainer>
            </PlayerContainer>
            <FlipIconSvgWrapper>
              <img
                src={FlipIconPNG}
                alt="Flip Indicator"
                style={{ filter: getFilter(player) }}
              />
            </FlipIconSvgWrapper>
          </PlayerAndFlipIconContainer>
        ))}
      </BlueTeamNamesWrapper>
      <OrangeTeamNamesWrapper>
        {gameInfo.players.filter((p) => p.team === 1).map((player, index) => (
          <OrangePlayerAndFlipIconContainer key={index}>
            <FlipIconSvgWrapper>
              <img
                src={FlipIconPNG}
                alt="Flip Indicator"
                style={{ filter: getFilter(player) }}
              />
            </FlipIconSvgWrapper>
            <OrangePlayerContainer >
              <OrangePlayerNameAndBoostContainer>
                <OrangePlayerName>{player.name}</OrangePlayerName>
              </OrangePlayerNameAndBoostContainer>
              <OrangeBoostBarContainer>
                <GreyBoostBarOrange />
                <OrangeBoostBar boost={Number(player.boost)} />
              </OrangeBoostBarContainer>
            </OrangePlayerContainer>
          </OrangePlayerAndFlipIconContainer>
        ))}
      </OrangeTeamNamesWrapper>
    </>
  );
};
