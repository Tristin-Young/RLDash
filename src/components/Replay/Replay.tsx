import { useContext, useState, useEffect } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import ReplayBlue from "../../assets/ReplayBlue.png";
import ReplayOrange from "../../assets/ReplayOrange.png";
import {
  AssistIMG,
  AssistScorerName,
  BallSpeed,
  GoalIMG,
  GoalScorerName,
  ReplayIMG,
} from "./Replay.style";
import Goal from "../../assets/goal.svg";
import Assist from "../../assets/assist.svg";
import { StatfeedEvent } from "../../models/StatfeedEvent/StatfeedEvent";
import { wait } from "@testing-library/user-event/dist/utils";
import { get } from "http";
export const Replay = () => {
  const { updateState, setUpdateState } = useContext(UpdateStateContext);
  const { subscribe } = useContext(WebsocketContext);
  const [statfeedEvent, setStatfeedEvent] = useState<any[]>([]);
  const [mostRecentGoalIndex, setMostRecentGoalIndex] = useState<number | null>(
    null
  );
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const [captureData, setCaptureData] = useState<any[]>([]);

  const [ballSpeed, setBallSpeed] = useState<number | null>(null);

  useEffect(() => {
    if (captureData.length > 0) {
      const latestCapture = captureData[captureData.length - 1];
      if (latestCapture?.game?.ball?.speed) {
        setBallSpeed(latestCapture.game.ball.speed * 0.621371); // Convert to MPH
      }
    }
  }, [captureData]);

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      if (
        innerMessage.event === "game:round_started_go" ||
        innerMessage.event === "game:post_countdown_begin" ||
        (innerMessage.event === "gamestate" && innerMessage.game.isReplay)
      ) {
        setCaptureData((prev) => [...prev, innerMessage]);
      }
    };

    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  useEffect(() => {
    const printCaptureData = (innerMessage: any) => {
      if (innerMessage.event === "gamestate" && innerMessage.game.isReplay) {
        //console.log("Capture Data", innerMessage);
      }
    };

    const unsubscribe = subscribe("gamestate", printCaptureData);

    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  // Reset the statfeed event when the game ends
  useEffect(() => {
    const resetStatfeedEvent = () => {
      setStatfeedEvent([]);
      setMostRecentGoalIndex(null);
    };

    const unsubscribeBase = subscribe(
      "game:statfeed_event_MVP",
      resetStatfeedEvent
    );

    return () => {
      unsubscribeBase();
    };
  }, [subscribe]);

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

  useEffect(() => {
    const getMostRecentGoalIndex = (events: any[]) => {
      for (let i = events.length - 1; i >= 0; i--) {
        if (events[i].data.event_name === "Goal") {
          //console.log("Most recent goal index updated to ", i);
          return i;
        }
      }
      return null;
    };

    const mostRecentGoalIdx = getMostRecentGoalIndex(statfeedEvent);
    setMostRecentGoalIndex(mostRecentGoalIdx);
    //console.log("Events", statfeedEvent);
  }, [statfeedEvent]);

  if (!controlPanelSettings.showReplayScreen) {
    return null;
  }
  return (
    <>
      {mostRecentGoalIndex !== null &&
        statfeedEvent[mostRecentGoalIndex]?.data.event_name === "Goal" &&
        statfeedEvent[mostRecentGoalIndex]?.data.main_target.team_num === 0 && (
          <>
            <ReplayIMG>
              <img src={ReplayBlue} alt="ReplayBlue" />
            </ReplayIMG>
          </>
        )}
      {mostRecentGoalIndex !== null &&
        statfeedEvent[mostRecentGoalIndex]?.data.event_name === "Goal" &&
        statfeedEvent[mostRecentGoalIndex]?.data.main_target.team_num === 1 && (
          <>
            <ReplayIMG>
              <img src={ReplayOrange} alt="ReplayOrange" />
            </ReplayIMG>
          </>
        )}
      {mostRecentGoalIndex !== null &&
        statfeedEvent[mostRecentGoalIndex]?.data.event_name === "Goal" &&
        statfeedEvent[mostRecentGoalIndex + 1]?.data.event_name ===
          "Assist" && (
          <>
            <GoalIMG>
              <img src={Goal} alt="Goal" />
            </GoalIMG>
            <AssistIMG>
              <img src={Assist} alt="Assist" />
            </AssistIMG>
            <GoalScorerName>
              {statfeedEvent[mostRecentGoalIndex]?.data.main_target.name}
            </GoalScorerName>
            <AssistScorerName>
              {statfeedEvent[mostRecentGoalIndex + 1]?.data.main_target.name}
            </AssistScorerName>
            <BallSpeed>{ballSpeed?.toFixed(2)} MPH</BallSpeed>
          </>
        )}
      {mostRecentGoalIndex !== null &&
        statfeedEvent[mostRecentGoalIndex]?.data.event_name === "Goal" &&
        statfeedEvent[mostRecentGoalIndex + 1]?.data.event_name !==
          "Assist" && (
          <>
            <GoalIMG>
              <img src={Goal} alt="Goal" />
            </GoalIMG>
            <AssistIMG>
              <img src={Goal} alt="Goal" />
            </AssistIMG>
            <GoalScorerName>
              {statfeedEvent[mostRecentGoalIndex]?.data.main_target.name}
            </GoalScorerName>
            <AssistScorerName>
              {statfeedEvent[mostRecentGoalIndex]?.data.main_target.name}
            </AssistScorerName>
            <BallSpeed>{ballSpeed?.toFixed(2)} MPH</BallSpeed>
          </>
        )}
    </>
  );
};
