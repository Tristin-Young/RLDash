// Scorebug.tsx
import { useContext, useEffect, useState } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import {
  ScorebugBlueLogo,
  ScorebugBlueName,
  ScorebugOrangeLogo,
  ScorebugOrangeName,
  ScorebugBlueScore,
  ScorebugClock,
  ScorebugOrangeScore,
  ScorebugWrapper,
  ScorebugWinPercentage,
  ScorebugSvgWrapper,
  ScorebugSeriesScore,
  OrangeUndertone,
  BlueUndertone,
} from "./Scorebug.style";
import { gameService } from "../../services/gameService";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { calculateWinProbability } from "../../services/winPercentage";
import ScoreBoardPNG from "../../assets/Asset 2_ScoreBoard_Holes.png";

export const Scorebug = () => {
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  const { controlPanelSettings, setControlPanelSettings } = useContext(ControlPanelSettingsContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext
  const [data, setData] = useState({});

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

  useEffect(() => {
    // Logic that should run when controlPanelSettings changes
    //console.log("Updated settings:", controlPanelSettings);
  }, [controlPanelSettings]);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:42000');

    webSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'loadSettings' || message.type === 'updateSettings') {
          setControlPanelSettings(message.data); // Update local state with new settings
        }
      };

    return () => {
      if (webSocket.readyState === WebSocket.OPEN) webSocket.close();
    };
}, []);

  if (!gameInfo) {
    console.log("No gameInfo");
    return <div>Loading game info...</div>;
  }
  //console.log("gameInfo:", gameInfo);
  const blueScore = gameInfo.score.blue;
  const orangeScore = gameInfo.score.orange;
  const winPred = calculateWinProbability(
    blueScore,
    orangeScore,
    gameInfo.timeRemaining
  );
  const winnerPred = winPred.Predicted_Winner;
  //create winprob, which is the predicted win percentage * 100, and truncate to 2 decimal places
  const winProb =
    (winPred.Win_Probability * 100).toFixed(2) === "0.00"
      ? "50"
      : (winPred.Win_Probability * 100).toFixed(2);

  const currentGame = controlPanelSettings.blueWins + controlPanelSettings.orangeWins + 1;
  //console.log(controlPanelSettings.BlueTeamPhoto, controlPanelSettings.OrangeTeamPhoto);
  return (
    <>
    <OrangeUndertone />
    <BlueUndertone />
      <ScorebugSvgWrapper>
        <img src={ScoreBoardPNG} alt="ScoreBoard" />
      </ScorebugSvgWrapper>
      <ScorebugWrapper>
        {controlPanelSettings.showWinProb === true && (
          <ScorebugWinPercentage>
            {winProb === "50" ? "TIED" : (winnerPred === "team1" ? controlPanelSettings.blueTeamName : controlPanelSettings.orangeTeamName)}
            : {winProb}%
          </ScorebugWinPercentage>
        )}
        <ScorebugSeriesScore>
          {controlPanelSettings.showSeriesScore === true && 
            <>
              {controlPanelSettings.NumberOfGames === 1 && <span>BO1 | Game&nbsp;</span>}
              {controlPanelSettings.NumberOfGames === 3 && <span>BO3 | Game&nbsp;</span>}
              {controlPanelSettings.NumberOfGames === 5 && <span>BO5 | Game&nbsp;</span>}
              {controlPanelSettings.NumberOfGames === 7 && <span>BO7 | Game&nbsp;</span>}
              {controlPanelSettings.NumberOfGames === 9 && <span>BO9 | Game&nbsp;</span>}
              {controlPanelSettings.NumberOfGames === 11 && <span>BO11 | Game&nbsp;</span>}
              {currentGame}
            </>
          }
        </ScorebugSeriesScore>
        <ScorebugBlueLogo>
          <img src={controlPanelSettings.BlueTeamPhoto} alt="" />
        </ScorebugBlueLogo>
        <ScorebugBlueName>{controlPanelSettings.blueTeamName}</ScorebugBlueName>
        <ScorebugBlueScore>{gameInfo.score.blue}</ScorebugBlueScore>
        <ScorebugOrangeName>
          {controlPanelSettings.orangeTeamName}
        </ScorebugOrangeName>
        <ScorebugOrangeScore>{gameInfo.score.orange}</ScorebugOrangeScore>
        <ScorebugOrangeLogo>
          <img src={controlPanelSettings.OrangeTeamPhoto} alt="" />
        </ScorebugOrangeLogo>
        <ScorebugClock>
          {gameService.getClockFromSeconds(
            gameInfo.timeRemaining,
            gameInfo.isOT
          )}
        </ScorebugClock>
        <ScorebugOrangeLogo />
      </ScorebugWrapper>
    </>
  );
};
