import { useContext, useEffect, useState } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { SaveGameDataContext } from "../../contexts/SaveGameDataContext";
import { SavePlayerDataContext } from "../../contexts/SavePlayerDataContext";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { StatfeedEvent } from "../../models/StatfeedEvent/StatfeedEvent";
import { calculateWinProbability } from "../../services/winPercentage";

export const SaveData = () => {
  const { updateState, setUpdateState } = useContext(UpdateStateContext);
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const { subscribe } = useContext(WebsocketContext);
  const { setGameData } = useContext(SaveGameDataContext);
  const { setPlayerData } = useContext(SavePlayerDataContext);
  const [captureData, setCaptureData] = useState<any[]>([]);
  const [statfeedEvent, setStatfeedEvent] = useState<StatfeedEvent[]>([]);

  const isDataSame = (data: any, lastData: any) => {
    return JSON.stringify(data) === JSON.stringify(lastData);
  };

  // Handle game updates
  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      if (
        innerMessage.event === "game:round_started_go" ||
        innerMessage.event === "game:post_countdown_begin" ||
        (innerMessage.event === "gamestate" && !innerMessage.game.isReplay)
      ) {
        setGameData(innerMessage);
        setPlayerData(innerMessage.players);
        setCaptureData((prev) => [...prev, innerMessage]);
      }
    };

    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
      unsubscribe();
    };
  }, [subscribe, setGameData, setPlayerData]);

  // Handle end of game and process data
  useEffect(() => {
    const processData = (data: any) => {
      if (
        data.event === "game:statfeed_event" &&
        data.data.event_name === "MVP"
      ) {
        //console.log("Game over, processing and saving data");
        processAndSaveGameData(captureData);
        processAndSaveStatfeedData(statfeedEvent);
      }
    };

    const unsubscribe = subscribe("game:statfeed_event_MVP", processData);

    return () => {
      unsubscribe();
    };
  }, [subscribe, captureData, statfeedEvent]);

  const processAndSaveGameData = (data: any[]) => {
    let gameCsvContent =
      "data:text/csv;charset=utf-8,matchGUID,Arena,Blue Team Name,Orange Team Name,Blue Team Score,Orange Team Score,Predicted Winner,Predicted Win Chance,Time Remaining,Is OT,Ball Location X,Ball Location Y,Ball Location Z,Ball Speed,Ball Team,Blue Series Score,Orange Series Score,Current Game,Series Length\n";

    data.forEach((item) => {
      if (item.event === "gamestate") {
        const { match_guid, game } = item;
        const ballData =
          game.ball && game.ball.location && game.ball.team !== undefined
            ? `${game.ball.location.X},${game.ball.location.Y},${game.ball.location.Z},${game.ball.speed},${game.ball.team}`
            : "0,0,92.75,0,N/A";

        if (ballData !== "0,0,92.75,0,N/A" && game.ball.team !== 255) {
          let winProbObj = calculateWinProbability(
            game.teams[0].score,
            game.teams[1].score,
            game.time_seconds
          );
          let winProb =
            (winProbObj.Win_Probability * 100).toFixed(2) === "0.00"
              ? "50"
              : (winProbObj.Win_Probability * 100).toFixed(2);
          let predWinner = winProbObj.Predicted_Winner;
          predWinner =
            predWinner === "TIED"
              ? "Tie"
              : predWinner === "TEAM0"
              ? controlPanelSettings.blueTeamName
              : controlPanelSettings.orangeTeamName;

          const row =
            [
              match_guid,
              game.arena,
              controlPanelSettings.blueTeamName,
              controlPanelSettings.orangeTeamName,
              game.teams[0].score,
              game.teams[1].score,
              predWinner,
              winProb,
              game.time_seconds,
              game.isOT,
              ballData,
              controlPanelSettings.blueWins,
              controlPanelSettings.orangeWins,
              controlPanelSettings.blueWins +
                controlPanelSettings.orangeWins +
                1,
              controlPanelSettings.NumberOfGames,
            ].join(",") + "\n";

          if (!isDataSame(row, gameCsvContent[gameCsvContent.length - 1])) {
            gameCsvContent += row;
          }
        }
      }
    });

    const blueTeamName = controlPanelSettings.blueTeamName;
    const orangeTeamName = controlPanelSettings.orangeTeamName;
    const currentGame =
      controlPanelSettings.blueWins + controlPanelSettings.orangeWins + 1;
    const numberOfGames = controlPanelSettings.NumberOfGames;
    const saveTime = new Date().toISOString();
    const encodedUri = encodeURI(gameCsvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `game${currentGame}of${numberOfGames}-${blueTeamName}_Vs_${orangeTeamName}-GameData-${saveTime}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const processAndSaveStatfeedData = (data: any[]) => {
    let statfeedCsvContent =
      "data:text/csv;charset=utf-8,Event Name,Type,Main Target Name,Main Target Team,Secondary Target Name,Secondary Target Team\n";

    data.forEach((item) => {
      if (item.event === "game:statfeed_event") {
        const row =
          [
            item.data.event_name,
            item.data.type,
            item.data.main_target.name,
            item.data.main_target.team,
            item.data.secondary_target.name,
            item.data.secondary_target.team,
          ].join(",") + "\n";

        if (
          !isDataSame(row, statfeedCsvContent[statfeedCsvContent.length - 1])
        ) {
          statfeedCsvContent += row;
        }
      }
    });

    const blueTeamName = controlPanelSettings.blueTeamName;
    const orangeTeamName = controlPanelSettings.orangeTeamName;
    const currentGame =
      controlPanelSettings.blueWins + controlPanelSettings.orangeWins + 1;
    const numberOfGames = controlPanelSettings.NumberOfGames;
    const saveTime = new Date().toISOString();
    const encodedUri = encodeURI(statfeedCsvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `game${currentGame}of${numberOfGames}-${blueTeamName}_Vs_${orangeTeamName}-StatfeedData-${saveTime}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const processStatfeedEvent = (data: any) => {
      if (data.event === "game:statfeed_event") {
        setStatfeedEvent((prev) => [...prev, data]);
      }
    };

    const unsubscribeBase = subscribe(
      "game:statfeed_event",
      processStatfeedEvent
    );

    return () => {
      unsubscribeBase();
    };
  }, [subscribe]);

  return null;
};
