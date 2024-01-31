// Scorebug.tsx
import { useContext, useEffect } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import {
  ScorebugBlueLogo,
  ScorebugBlueName,
  ScorebugOrangeLogo,
  ScorebugOrangeName,
  ScorebugBlueScore,
  ScorebugClock,
  ScorebugCreatorBanner,
  ScorebugOrangeScore,
  ScorebugWrapper,
  ScorebugWinPercentage,
} from "./Scorebug.style";
import { gameService } from "../../services/gameService";
import { UpdateState } from "../../models/UpdateState/UpdateState";
import { GameContext } from "../../models/contexts/GameContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { calculateWinProbability } from "../../services/winPercentage";

export const Scorebug = () => {
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

  if (!gameInfo) {
    console.log("No gameInfo");
    return <div>Loading game info...</div>;
  }
  //console.log("gameInfo:", gameInfo);
  const blueScore = gameInfo.score.blue;
  const orangeScore = gameInfo.score.orange;
  const winPred = calculateWinProbability(blueScore, orangeScore, gameInfo.timeRemaining);
  const winnerPred = winPred.Predicted_Winner;
  //create winprob, which is the predicted win percentage * 100, and truncate to 2 decimal places
  const winProb = (winPred.Win_Probability * 100).toFixed(2);
  return (
    <>
      <ScorebugWrapper>
        <ScorebugWinPercentage>{winnerPred}: {winProb}%</ScorebugWinPercentage>
        <ScorebugBlueLogo />
        <ScorebugBlueName>BLUE</ScorebugBlueName>
        <ScorebugBlueScore>{gameInfo.score.blue}</ScorebugBlueScore>
        <ScorebugOrangeName>ORANGE</ScorebugOrangeName>
        <ScorebugOrangeScore>{gameInfo.score.orange}</ScorebugOrangeScore>
        <ScorebugClock>
          {gameService.getClockFromSeconds(
            gameInfo.timeRemaining,
            gameInfo.isOT
          )}
        </ScorebugClock>
        <ScorebugOrangeLogo />
        <ScorebugCreatorBanner>Powered by CANA Solutions</ScorebugCreatorBanner>
        
      </ScorebugWrapper>
    </>
  );
};

