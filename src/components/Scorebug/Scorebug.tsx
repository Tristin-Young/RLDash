// Scorebug.tsx
import { useContext, useEffect, useState } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
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
  ScorebugSeriesScoreAndWinPercentage,
  CanaSVGwrapper,
  SeriesScoreUndertone,
  OrangeSeriesScoreUndertone,
  SeriesScoreDynamicUndertone,
  OrangeSeriesScoreDynamicUndertone,
  DarkSeriesScoreUndertone,
} from "./Scorebug.style";
import { gameService } from "../../services/gameService";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { calculateWinProbability } from "../../services/winPercentage";
import ScoreBoardBO1 from "../../assets/ScorecardBO1.png";
import ScoreBoardBO3 from "../../assets/ScorecardBO3.png";
import ScoreBoardBO5 from "../../assets/ScorecardBO5.png";
import ScoreBoardBO7 from "../../assets/ScorecardBO7.png";

import CanaLogo from "../../assets/CANAesportsLogo.png";

export const Scorebug = () => {
  const { updateState, setUpdateState } = useContext(UpdateStateContext);
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );

  const { subscribe } = useContext(WebsocketContext); // Changed to useContext
  const [data, setData] = useState({});

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      //console.log("innerMessage:", innerMessage);
      if (innerMessage.event === "gamestate") {
        if (innerMessage.players.length > 0) {
          const gameContext = transformGameUpdate(innerMessage);
          // console.log("gameContext:", gameContext);
          // console.log("innerMessage:", innerMessage);
          setUpdateState(innerMessage);
        }
        // Update the type of setUpdateState to accept void as a valid argument
      }
    };
    //console.log("UpdateState:", UpdateState);
    // Subscribe and get the unsubscribe function
    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
      unsubscribe(); // Call the unsubscribe function on cleanup
    };
  }, [subscribe, setUpdateState]);

  // useEffect(() => {
  //   // Logic that should run when controlPanelSettings changes
  //   //console.log("Updated settings:", controlPanelSettings);
  // }, [controlPanelSettings]);

  if (!updateState) {
    //console.log("No gameInfo");
    return <div>Loading game info...</div>;
  }
  //console.log("gameInfo:", gameInfo);
  //console.log("UpdateState:", UpdateState);
  const blueScore = updateState.game.teams[0].score;
  const orangeScore = updateState.game.teams[1].score;
  const winPred = calculateWinProbability(
    blueScore,
    orangeScore,
    updateState.game.time_seconds
  );
  const winnerPred = winPred.Predicted_Winner;
  //create winprob, which is the predicted win percentage * 100, and truncate to 2 decimal places
  const winProb =
    (winPred.Win_Probability * 100).toFixed(2) === "0.00"
      ? "50"
      : (winPred.Win_Probability * 100).toFixed(2);
  //console.log("Predicted Winner:", winnerPred);
  const currentGame =
    controlPanelSettings.blueWins + controlPanelSettings.orangeWins + 1;
  //console.log(controlPanelSettings.BlueTeamPhoto, controlPanelSettings.OrangeTeamPhoto);

  return (
    <>
      {/* <CanaSVGwrapper>
        <img src={CanaLogo} alt="Cana Logo" />
      </CanaSVGwrapper> */}
      <SeriesScoreUndertone
        style={{ backgroundColor: controlPanelSettings.blueTeamColor }}
      />
      <OrangeSeriesScoreUndertone
        style={{ backgroundColor: controlPanelSettings.orangeTeamColor }}
      />
      <DarkSeriesScoreUndertone />
      <OrangeSeriesScoreDynamicUndertone
        style={{
          backgroundColor: controlPanelSettings.orangeTeamColor,
          width: 45 * controlPanelSettings.orangeWins,
        }}
      />
      <SeriesScoreDynamicUndertone
        style={{
          backgroundColor: controlPanelSettings.blueTeamColor,
          width: 45 * controlPanelSettings.blueWins,
        }}
      />

      <OrangeUndertone
        style={{ backgroundColor: controlPanelSettings.orangeTeamColor }}
      />
      <BlueUndertone
        style={{ backgroundColor: controlPanelSettings.blueTeamColor }}
      />
      <ScorebugSvgWrapper>
        {controlPanelSettings.showTeamWins &&
          controlPanelSettings.NumberOfGames === 1 && (
            <img src={ScoreBoardBO1} alt="ScoreBoard" />
          )}
        {controlPanelSettings.showTeamWins &&
          controlPanelSettings.NumberOfGames === 3 && (
            <img src={ScoreBoardBO3} alt="ScoreBoard" />
          )}
        {controlPanelSettings.showTeamWins &&
          controlPanelSettings.NumberOfGames === 5 && (
            <img src={ScoreBoardBO5} alt="ScoreBoard" />
          )}
        {controlPanelSettings.showTeamWins &&
          controlPanelSettings.NumberOfGames === 7 && (
            <img src={ScoreBoardBO7} alt="ScoreBoard" />
          )}
        {/* {controlPanelSettings.showTeamWins &&
          controlPanelSettings.NumberOfGames === 9 && (
            <img src={ScoreBoardBO9} alt="ScoreBoard" />
          )} */}
        {!controlPanelSettings.showTeamWins && (
          <img src={ScoreBoardBO1} alt="ScoreBoard" />
        )}
      </ScorebugSvgWrapper>
      <ScorebugWrapper>
        {controlPanelSettings.SeriesScoreWinPercent === "WinPercent" && (
          <ScorebugWinPercentage>
            {winProb === "50"
              ? "TIED"
              : winnerPred === "TEAM1"
              ? controlPanelSettings.blueTeamName
              : controlPanelSettings.orangeTeamName}
            : {winProb}%
          </ScorebugWinPercentage>
        )}
        {controlPanelSettings.SeriesScoreWinPercent === "Both" && (
          <ScorebugSeriesScoreAndWinPercentage>
            <div>
              <span>Game&nbsp;</span>
              {currentGame}
              <span>&nbsp;|&nbsp;</span>
              {controlPanelSettings.NumberOfGames === 1 && <span>BO1</span>}
              {controlPanelSettings.NumberOfGames === 3 && <span>BO3</span>}
              {controlPanelSettings.NumberOfGames === 5 && <span>BO5</span>}
              {controlPanelSettings.NumberOfGames === 7 && <span>BO7</span>}
              {controlPanelSettings.NumberOfGames === 9 && <span>BO9</span>}
              {controlPanelSettings.NumberOfGames === 11 && <span>BO11</span>}
            </div>
            <div>
              {winProb === "50"
                ? "TIED"
                : winnerPred === "TEAM1"
                ? controlPanelSettings.blueTeamName
                : controlPanelSettings.orangeTeamName}
              : {winProb}%
            </div>
          </ScorebugSeriesScoreAndWinPercentage>
        )}
        {controlPanelSettings.SeriesScoreWinPercent === "SeriesScore" && (
          <ScorebugSeriesScore>
            <span>Game&nbsp;</span>
            {currentGame}
            <span>&nbsp;|&nbsp;</span>
            {controlPanelSettings.NumberOfGames === 1 && <span>BO1</span>}
            {controlPanelSettings.NumberOfGames === 3 && <span>BO3</span>}
            {controlPanelSettings.NumberOfGames === 5 && <span>BO5</span>}
            {controlPanelSettings.NumberOfGames === 7 && <span>BO7</span>}
            {controlPanelSettings.NumberOfGames === 9 && <span>BO9</span>}
            {controlPanelSettings.NumberOfGames === 11 && <span>BO11</span>}
          </ScorebugSeriesScore>
        )}

        <ScorebugBlueLogo>
          <img src={controlPanelSettings.BlueTeamPhoto} alt="" />
        </ScorebugBlueLogo>
        <ScorebugBlueName>{controlPanelSettings.blueTeamName}</ScorebugBlueName>
        <ScorebugBlueScore>{updateState.game.teams[0].score}</ScorebugBlueScore>
        <ScorebugOrangeName>
          {controlPanelSettings.orangeTeamName}
        </ScorebugOrangeName>
        <ScorebugOrangeScore>
          {updateState.game.teams[1].score}
        </ScorebugOrangeScore>
        <ScorebugOrangeLogo>
          <img src={controlPanelSettings.OrangeTeamPhoto} alt="" />
        </ScorebugOrangeLogo>
        <ScorebugClock>
          {gameService.getClockFromSeconds(
            updateState.game.time_seconds,
            updateState.game.isOT
          )}
        </ScorebugClock>
        <ScorebugOrangeLogo />
      </ScorebugWrapper>
    </>
  );
};
