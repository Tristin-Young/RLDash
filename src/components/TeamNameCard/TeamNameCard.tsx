import { useContext, useEffect } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { gameService } from "../../services/gameService";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";

export const TeamNameCard = () => {
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
                <div>
                    <p>{spectatedPlayer.name}</p>
                </div>
            )}
        </>
    )
}