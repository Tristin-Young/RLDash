import { useContext, 
  useEffect, 
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
  // FlipIconSvgWrapper,
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
//import FlipIconPNG from "../../assets/flipIcon.png";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
//import { USPlayer } from "../../models/USPlayer";

export const PlayerTeamName = () => {
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  // const [team0Players, setTeam0Players] = useState<WebSocketPlayer[]>([]);
  // const [team1Players, setTeam1Players] = useState<WebSocketPlayer[]>([]);
  const { subscribe } = useContext(WebsocketContext);
  // const [combinedBlueTeam, setCombinedBlueTeam] = useState<
  //   (USPlayer & Partial<WebSocketPlayer>)[]
  // >([]);
  // const [combinedOrangeTeam, setCombinedOrangeTeam] = useState<
  //   (USPlayer & Partial<WebSocketPlayer>)[]
  // >([]);

  // const combinePlayerArrays = (
  //   existingPlayers: USPlayer[],
  //   newPlayers: WebSocketPlayer[]
  // ) => {
  //   console.log("Existing Players:", gameInfo.players);
  //   console.log("New Players from WebSocket:", team0Players, team1Players);
  //   let combined = existingPlayers.map((existingPlayer) => {
  //     const match = newPlayers.find(
  //       (newPlayer) => newPlayer.name.trim().toLowerCase() === existingPlayer.name.trim().toLowerCase()
  //     );
  //     if (match) {
  //       console.log(`Matching player found for ${existingPlayer.name}:`, match);
  //       return {
  //         ...existingPlayer,
  //         numWheelsOnGround: match.numWheelsOnGround,
  //         timeOffGround: match.timeOffGround,
  //         isDodging: match.isDodging
  //       };
  //     } else {
  //       console.log(`No match found for ${existingPlayer.name}`, existingPlayer, newPlayers);
  //       return existingPlayer;
  //     }
  //   });

  //   console.log("Combined Array:", combined);
  //   return combined;
  // };

  // Function to determine the correct filter for the flip icon
  // const getFilter = (player: USPlayer & Partial<WebSocketPlayer>) => {
  //   const isOnGround = player.onGround;
  //   const isOnWall = player.onWall;

  //   if (isOnGround || isOnWall){
  //     return player.team === 0
  //       ? "invert(77%) sepia(75%) saturate(3420%) hue-rotate(133deg) brightness(104%) contrast(104%)"
  //       : "invert(55%) sepia(72%) saturate(560%) hue-rotate(347deg) brightness(105%) contrast(92%)";
  //   } else {
  //     return "invert(51%) sepia(1%) saturate(0%) hue-rotate(353deg) brightness(99%) contrast(87%)";
  //   }
  // };

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      const gameContext = transformGameUpdate(innerMessage);
      setGameInfo(gameContext);
    };

    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    // const ws = new WebSocket("ws://localhost:43003");
    // ws.onmessage = (event) => {
    //   const { team0, team1 } = JSON.parse(event.data);
    //   //console.log("WebSocket message received:", team0, team1);
    //   setTeam0Players(team0);
    //   setTeam1Players(team1);
    // };
    


    return () => {
      unsubscribe();
      // ws.close();
    };
  }, [subscribe, setGameInfo]);

  // useEffect(() => {
  //   const combinedBlue = combinePlayerArrays(
  //     gameInfo.players.filter((p) => p.team === 0),
  //     team0Players
  //   );
  //   const combinedOrange = combinePlayerArrays(
  //     gameInfo.players.filter((p) => p.team === 1),
  //     team1Players
  //   );

  //   console.log("Combined Blue Team:", combinedBlue);
  //   console.log("Combined Orange Team:", combinedOrange);
  //   setCombinedBlueTeam(combinedBlue);
  //   setCombinedOrangeTeam(combinedOrange);
  // }, [gameInfo.players, team0Players, team1Players]);

  // Assuming the rest of your component returns correctly
  // Including rendering logic for displaying player names, circles, etc.

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
            {/* <FlipIconSvgWrapper>
              <img
                src={FlipIconPNG}
                alt="Flip Indicator"
                style={{ filter: getFilter(player) }}
              />
            </FlipIconSvgWrapper> */}
          </PlayerAndFlipIconContainer>
        ))}
      </BlueTeamNamesWrapper>
      <OrangeTeamNamesWrapper>
        {gameInfo.players.filter((p) => p.team === 1).map((player, index) => (
          <OrangePlayerAndFlipIconContainer key={index}>
            {/* <FlipIconSvgWrapper>
              <img
                src={FlipIconPNG}
                alt="Flip Indicator"
                style={{ filter: getFilter(player) }}
              />
            </FlipIconSvgWrapper> */}
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
