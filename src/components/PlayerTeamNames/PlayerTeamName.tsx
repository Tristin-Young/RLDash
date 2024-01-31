import { useContext, useEffect } from "react"
import { GameInfoContext } from "../../contexts/GameInfoContext"
import { gameService } from "../../services/gameService"
import { BlueBoostBar, BlueTeamNamesWrapper, BoostBarContainer, BoostNumber, GreyBoostBar, OrangeBoostBar, OrangeBoostBarContainer, OrangePlayerContainer, OrangePlayerName, OrangeTeamNamesWrapper, PlayerContainer, PlayerName, PlayerNameAndBoostContainer } from "./PlayerTeamName.style";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { ReactComponent as AerialHitSVG } from '../../constants/aerial-hit.svg'; // Adjust the path as necessary

export const PlayerTeamName = () => {

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
    
    // create an array and loop through gameInfo.players and save the names
    // of the players on the blue and orange teams
    const blueTeam = [];
    const orangeTeam = [];
    for (let i = 0; i < gameInfo.players.length; i++) {
        if (gameInfo.players[i].team === 0) {
            blueTeam.push([gameInfo.players[i].name, gameInfo.players[i].boost, gameInfo.players[i].onGround, gameInfo.players[i].onWall]);

        } else {
            orangeTeam.push([gameInfo.players[i].name, gameInfo.players[i].boost]);
        }
    }

    
    return (
        <>
            {blueTeam && (
                <BlueTeamNamesWrapper>
                    {blueTeam.map((player) => (
                        <PlayerContainer>
                        <PlayerNameAndBoostContainer>
                            <PlayerName>{player[0]}</PlayerName>
                            <AerialHitSVG />
                        </PlayerNameAndBoostContainer>
                        <BoostBarContainer>
                            <GreyBoostBar />
                            <BlueBoostBar boost={Number(player[1])} />
                        </BoostBarContainer>
                        </PlayerContainer>
                    ))}
                </BlueTeamNamesWrapper>
            )}
            {orangeTeam && (
                <OrangeTeamNamesWrapper>
                {orangeTeam.map((player) => (
                    <OrangePlayerContainer>
                    <PlayerNameAndBoostContainer>
                    <AerialHitSVG />
                        <OrangePlayerName>{player[0]}</OrangePlayerName>
                    </PlayerNameAndBoostContainer>
                    <OrangeBoostBarContainer>
                        <GreyBoostBar />
                        <OrangeBoostBar boost={Number(player[1])} />
                    </OrangeBoostBarContainer>
                    </OrangePlayerContainer>
                ))}
            </OrangeTeamNamesWrapper>
            )}
        </>
    )
        

}