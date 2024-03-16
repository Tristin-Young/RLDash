// Overlay.tsx
import {
  // React,
  useContext,
  useEffect,
  useState,
  SetStateAction,
} from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";
import { GameInfoContext } from "../contexts/GameInfoContext";
import { ControlPanelSettingsContext } from "../contexts/ControlPanelSettingsContext";
import { Scorebug } from "../components/Scorebug/Scorebug";
import { PlayerStatBar } from "../components/PlayerStatBar/PlayerStatBar";
import { PlayerBoostMeter } from "../components/PlayerBoostMeter/PlayerBoostMeter";
import { PlayerTeamName } from "../components/PlayerTeamNames/PlayerTeamName";
import { transformGameUpdate } from "../contexts/transformGameUpdate";
import { SaveData } from "../components/SaveData/SaveData";
import { UpdateStateContext } from "../contexts/UpdateStateContext";

export const Overlay = () => {
  const { setUpdateState } = useContext(UpdateStateContext);
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const [showOverlayBE, setShowOverlayBE] = useState(
    controlPanelSettings.showOverlayBE
  );

  const { subscribe } = useContext(WebsocketContext);

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      //console.log("innerMessage:", innerMessage);
      if (innerMessage.event === "gamestate") {
        const gameContext = transformGameUpdate(innerMessage);
        setUpdateState(gameContext);
      }
      if (
        innerMessage.event === "game:post_countdown_begin" ||
        innerMessage.event === "game:replay_end" ||
        (innerMessage.event === "gamestate" &&
          innerMessage.game.isReplay === false &&
          innerMessage.game.hasWinner === false &&
          innerMessage.players.length > 0)
      ) {
        if (showOverlayBE === false) {
          setShowOverlayBE(true);
        }
      } else if (
        innerMessage.event === "game:goal_scored" ||
        innerMessage.event === "game:clock_stopped" ||
        (innerMessage.event === "gamestate" &&
          innerMessage.game.isReplay === true)
      ) {
        if (showOverlayBE === true) {
          setShowOverlayBE(false);
        }
      }
    };

    // Subscribe and get the unsubscribe function
    const unsubscribe = subscribe("gamestate", handleGameUpdate);
    const unsubscribePostCountdownBegin = subscribe(
      "game:post_countdown_begin",
      handleGameUpdate
    );
    const unsubscribeGoalScored = subscribe(
      "game:goal_scored",
      handleGameUpdate
    );
    const unsubscribeClockStopped = subscribe(
      "game:clock_stopped",
      handleGameUpdate
    );
    return () => {
      unsubscribe();
      unsubscribePostCountdownBegin();
      unsubscribeGoalScored();
      unsubscribeClockStopped();
    };
  }, [subscribe, setUpdateState]);
  useEffect(() => {
    // Logic that should run when controlPanelSettings changes
    //console.log("Updated settings:", controlPanelSettings);
  }, [controlPanelSettings]);
  //console.log("showOverlayBE:", controlPanelSettings.showOverlayBE);
  return (
    <>
      <SaveData />
      {showOverlayBE && (
        <>
          <Scorebug />
          <PlayerStatBar />
          <PlayerBoostMeter />
          <PlayerTeamName />
        </>
      )}
    </>
  );
};
