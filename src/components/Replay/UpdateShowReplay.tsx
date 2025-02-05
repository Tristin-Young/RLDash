import React, { useContext, useState, useEffect, useRef } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export const UpdateShowReplay = () => {
  const { setControlPanelSettings } = useContext(ControlPanelSettingsContext);
  const { subscribe } = useContext(WebsocketContext);

  const isReplayVisibleRef = useRef<boolean>(false);

  const hideReplay = () => {
    if (isReplayVisibleRef.current) {
      //console.log("Hiding replay");
      setControlPanelSettings((prevSettings) => {
        const updatedSettings = { ...prevSettings, showReplayScreen: false };
        isReplayVisibleRef.current = false;
        //console.log("Replay hidden, updated settings:", updatedSettings);
        return updatedSettings;
      });
    }
  };

  const showReplay = () => {
    if (!isReplayVisibleRef.current) {
      //console.log("Showing replay");
      setControlPanelSettings((prevSettings) => {
        const updatedSettings = { ...prevSettings, showReplayScreen: true };
        isReplayVisibleRef.current = true;
        //console.log("Replay shown, updated settings:", updatedSettings);
        return updatedSettings;
      });
    }
  };

  useEffect(() => {
    const handleShowReplay = () => showReplay();
    const handleHideReplay = () => hideReplay();

    const unsubscribeReplayStart = subscribe(
      "game:replay_start",
      handleShowReplay
    );
    const unsubscribeReplayEnd = subscribe("game:replay_end", handleHideReplay);

    return () => {
      unsubscribeReplayStart();
      unsubscribeReplayEnd();
    };
  }, [subscribe]);

  return null;
};
