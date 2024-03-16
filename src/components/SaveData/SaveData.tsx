//SaveData.tsx
import { useContext, useEffect, useState } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { calculateWinProbability } from "../../services/winPercentage";
import { SaveGameDataContext } from "../../contexts/SaveGameDataContext";
import { SavePlayerDataContext } from "../../contexts/SavePlayerDataContext";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { unsubscribe } from "diagnostics_channel";
import { GameDataContext } from "../../models/contexts/GameDataContext";
import { StatfeedEventContext } from "../../contexts/StatfeedEventContext";
import { StatfeedEvent } from "../../models/StatfeedEvent/StatfeedEvent";
interface GamestatePlayerData {
  name: string;
  team: number;
  isOnGround: boolean;
  isOnWall: boolean;
  location: {
    X: number;
    Y: number;
    Z: number;
    pitch: number;
    roll: number;
    yaw: number;
  };
  speed: number;
  score: number;
  goals: number;
  assists: number;
  saves: number;
  shots: number;
  demos: number;
  touches: number;
  hasFlip: string;
  isDead: boolean;
}
interface PluginPlayerData {
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
//interface for messages with player-specific data only
interface PlayerData {
  [key: string]: {
    name: string;
    team: number;
    numWheelsOnGround: number;
    timeOffGround: number;
    isDodging: boolean;
    isOnGround: boolean;
    isOnWall: boolean;
    location: {
      X: number;
      Y: number;
      Z: number;
      pitch: number;
      roll: number;
      yaw: number;
    };
    speed: number;
    score: number;
    goals: number;
    assists: number;
    saves: number;
    shots: number;
    demos: number;
    touches: number;
    hasFlip: string;
    isDead: boolean;
  };
}

//interface to support received data interface
interface TeamData {
  players: Array<{
    name: string;
    numWheelsOnGround: number;
    timeOffGround: number;
    isDodging: string;
  }>;
}

export const SaveData = () => {
  //console.log("SaveData.tsx touched - save beginning");
  const { updateState, setUpdateState } = useContext(UpdateStateContext);
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext
  const { gameData, setGameData } = useContext(SaveGameDataContext);
  const { playerData, setPlayerData } = useContext(SavePlayerDataContext);
  const [captureData, setCaptureData] = useState([] as any[]);
  const [statfeedCaptureData, setStatfeedCaptureData] = useState([] as any[]);
  const [statfeedEvent, setStatfeedEvent] = useState<StatfeedEvent[]>([]);
  const [hasDataSavedFlag, setHasDataSavedFlag] = useState(false);

  //function to check if data exacrlt matches last data input captured
  const isDataSame = (data: any, lastData: any) => {
    return JSON.stringify(data) === JSON.stringify(lastData);
  };

  useEffect(() => {
    // This effect is for handling game updates
    const handleGameUpdate = (innerMessage: any) => {
      if (
        innerMessage.event === "game:round_started_go" ||
        "game:post_countdown_begin" ||
        ("gamestate" && !innerMessage.game.isReplay)
      ) {
        setGameData(innerMessage);
        const playersUpdate = innerMessage.players; // Assuming setGameData accepts the entire message for simplicity
        setPlayerData(innerMessage.players); // Assuming setPlayerData accepts the players part of the message
        setCaptureData((prev) => [...prev, innerMessage]);
        if (hasDataSavedFlag) {
          setHasDataSavedFlag(false);
        }
      }
    };

    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    // Cleanup function to unsubscribe
    return () => {
      unsubscribe();
    };
  }, [subscribe]); // Note: Including captureData here might lead to multiple subscriptions

  // Use an effect to detect when the game ends and process data
  useEffect(() => {
    const processData = (data: any) => {
      if (
        data.event === "game:statfeed_event" &&
        data.data.event_name === "MVP"
      ) {
        console.log("Game over, processing and saving data");
        processAndSaveGameData(captureData);
        processAndSaveStatfeedData(statfeedEvent);
      }
    };

    const unsubscribe = subscribe("game:statfeed_event_MVP", processData);

    return () => {
      unsubscribe();
    };
  }, [subscribe]); // This effect depends on captureData updates

  const processAndSaveGameData = (data: any[]) => {
    let gameCsvContent =
      "data:text/csv;charset=utf-8,matchGUID,Arena,Blue Team Name,Orange Team Name,Blue Team Score,Orange Team Score,Predicted Winner,Predicted Win Chance,Time Remaining,Is OT,Ball Location X,Ball Location Y,Ball Location Z,Ball Speed,Ball Team,Blue Series Score,Orange Series Score,Current Game,Series Length\n";
    data.forEach((item) => {
      //console.log("item:", item);
      if (item.event === "gamestate") {
        // Assuming gamestate events contain the data you're interested in
        const { match_guid, game } = item;
        const ballData = game.ball
          ? `${game.ball.location.X},${game.ball.location.Y},${game.ball.location.Z},${game.ball.speed},${game.ball.team}`
          : "0,0,92.75,0,N/A";
        if (ballData === "0,0,92.75,0,N/A" || game.ball.team === 255) {
          console.log("No ball data found");
          return;
        } else {
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
          if (predWinner === "TIED") {
            predWinner = "Tie";
          } else if (predWinner === "TEAM0" || predWinner === "TEAM1") {
            predWinner =
              predWinner === "TEAM0"
                ? controlPanelSettings.blueTeamName
                : controlPanelSettings.orangeTeamName;
          }

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
          //if the row to be added is the same as the last row, don't add it
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
      "game" +
        currentGame +
        "of" +
        numberOfGames +
        "-" +
        blueTeamName +
        "_" +
        "Vs" +
        "_" +
        orangeTeamName +
        "-" +
        "GameData" +
        "-" +
        saveTime +
        ".csv"
    );
    document.body.appendChild(link);
    if (!hasDataSavedFlag) {
      link.click();
      setHasDataSavedFlag(true);
    }
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
      "game" +
        currentGame +
        "of" +
        numberOfGames +
        "-" +
        blueTeamName +
        "_" +
        "Vs" +
        "_" +
        orangeTeamName +
        "-" +
        "StatfeedData" +
        "-" +
        saveTime +
        ".csv"
    );
    document.body.appendChild(link);
    if (!hasDataSavedFlag) {
      link.click();
      setHasDataSavedFlag(true);
    }
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
    const unsubscribeShotOnGoal = subscribe(
      "game:statfeed_event_shotOnGoal",
      processStatfeedEvent
    );
    const unsubscribeGoal = subscribe(
      "game:statfeed_event_goal",
      processStatfeedEvent
    );
    const unsubscribeSave = subscribe(
      "game:statfeed_event_save",
      processStatfeedEvent
    );
    const unsubscribeAssist = subscribe(
      "game:statfeed_event_assist",
      processStatfeedEvent
    );
    const unsubscribeDemolition = subscribe(
      "game:statfeed_event_demolition",
      processStatfeedEvent
    );
    const unsubscribeEpicSave = subscribe(
      "game:statfeed_event_epicSave",
      processStatfeedEvent
    );
    const unsubscribeMVP = subscribe(
      "game:statfeed_event_MVP",
      processStatfeedEvent
    );
    const unsubscribeWin = subscribe(
      "game:statfeed_event_win",
      processStatfeedEvent
    );

    return () => {
      unsubscribeBase();
      unsubscribeShotOnGoal();
      unsubscribeGoal();
      unsubscribeSave();
      unsubscribeAssist();
      unsubscribeDemolition();
      unsubscribeEpicSave();
      unsubscribeMVP();
      unsubscribeWin();
    };
  }, [subscribe]);

  useEffect(() => {
    // Assuming you've already set up ws as a WebSocket connection to the new source
    const newWebsocketURL = "ws://localhost:43003";
    const newWs = new WebSocket(newWebsocketURL);

    newWs.addEventListener("open", () => {
      console.log("Connected to the new player data source");
    });

    newWs.addEventListener("message", (event) => {
      const currentData = JSON.parse(event.data);
      const updatedData: PlayerData = {};
      Object.entries(currentData.teams).forEach(
        ([teamKey, teamPlayers]: [string, any]) => {
          // Note: Now iterating over an object of players directly under each team
          Object.values(teamPlayers).forEach((player: any) => {
            updatedData[player.name] = {
              ...player,
              hasFlip: player.hasFlip,
              numWheelsOnGround: player.numWheelsOnGround,
              timeOffGround: player.timeOffGround,
              isDodging: player.isDodging,
            };
            //console.log("Updated player data:", updatedData[player]);
            setPlayerData(updatedData[player]);
          });
        }
      );
    });

    return () => {
      if (newWs.readyState === WebSocket.OPEN) newWs.close();
    };
  }, []);

  // Empty dependency array means this effect runs once on component mount

  return <></>;
};
