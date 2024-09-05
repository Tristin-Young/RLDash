import { useContext, useEffect, useRef } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export const UpdateShowOverlay = () => {
  const { setControlPanelSettings } = useContext(ControlPanelSettingsContext);
  const { subscribe } = useContext(WebsocketContext);

  const isOverlayVisibleRef = useRef<boolean>(false);

  const hideOverlay = () => {
    setControlPanelSettings((prevSettings) => {
      if (!prevSettings.showOverlayBE) return prevSettings;
      const updatedSettings = { ...prevSettings, showOverlayBE: false };
      isOverlayVisibleRef.current = false;
      return updatedSettings;
    });
  };

  const showOverlay = () => {
    setControlPanelSettings((prevSettings) => {
      if (prevSettings.showOverlayBE) return prevSettings;
      const updatedSettings = { ...prevSettings, showOverlayBE: true };
      isOverlayVisibleRef.current = true;
      return updatedSettings;
    });
  };

  useEffect(() => {
    const handleHideOverlay = () => hideOverlay();
    const unsubscribeReplayStart = subscribe(
      "game:replay_start",
      handleHideOverlay
    );
    return () => unsubscribeReplayStart();
  }, [subscribe]);

  useEffect(() => {
    const handleShowOverlay = () => showOverlay();
    const unsubscribeReplayEnd = subscribe(
      "game:replay_end",
      handleShowOverlay
    );
    return () => unsubscribeReplayEnd();
  }, [subscribe]);

  useEffect(() => {
    const handleGameStart = () => showOverlay();
    const unsubscribeGameStart = subscribe(
      "game:pre_countdown_begin",
      handleGameStart
    );
    const unsubscribeClockTick = subscribe(
      "game:clock_updated_seconds",
      handleGameStart
    );

    return () => {
      unsubscribeGameStart();
      unsubscribeClockTick();
    };
  }, [subscribe]);

  useEffect(() => {
    const handleGameEnd = () => {
      setTimeout(() => hideOverlay(), 500); // Adds a slight delay
    };
    const unsubscribeReplayStart = subscribe(
      "game:replay_start",
      handleGameEnd
    );
    const unsubscribeClockStop = subscribe("game:clock_stopped", handleGameEnd);

    return () => {
      unsubscribeReplayStart();
      unsubscribeClockStop();
    };
  }, [subscribe]);

  return null;
};
