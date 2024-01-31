import { useContext, useEffect } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { gameService } from "../../services/gameService";
import { StatCardContainer, StatCardStatName, StatCardStatValue, StatCardWrapper } from "./PlayerStatCard.style";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";

export const PlayerStatCard = () => {
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
    const spectatedPlayer = gameService.getPlayerFromTarget(gameInfo.players, gameInfo.target);
    return(
        <>
            {spectatedPlayer && (
                <StatCardWrapper>
                    <p>{spectatedPlayer.name}</p>
                    <StatCardContainer>
                        <div>
                            <StatCardStatName>GOALS</StatCardStatName>
                            <StatCardStatValue>{spectatedPlayer.goals}</StatCardStatValue>
                        </div>
                        <div style={{ marginLeft: "40px" }}>
                            <StatCardStatName>ASSISTS</StatCardStatName>
                            <StatCardStatValue>{spectatedPlayer.assists}</StatCardStatValue>
                        </div>
                        <div style={{ marginLeft: "40px" }}>
                            <StatCardStatName>SAVES</StatCardStatName>
                            <StatCardStatValue>{spectatedPlayer.saves}</StatCardStatValue>
                        </div>
                        <div style={{ marginLeft: "40px" }}>
                            <StatCardStatName>SHOTS</StatCardStatName>
                            <StatCardStatValue>{spectatedPlayer.shots}</StatCardStatValue>
                        </div>
                    </StatCardContainer>
                </StatCardWrapper>
            )}
        </>
    )
}