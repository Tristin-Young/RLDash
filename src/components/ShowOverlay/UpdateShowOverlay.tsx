import { useContext, useEffect, useRef } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export const UpdateShowOverlay = () => {
  const { setControlPanelSettings } = useContext(ControlPanelSettingsContext);
  const { subscribe } = useContext(WebsocketContext);

  const isOverlayVisibleRef = useRef<boolean>(false); // Track the overlay visibility

  const hideOverlay = () => {
    if (isOverlayVisibleRef.current) {
      // Ensure this condition is met
      console.log("Hiding overlay");
      setControlPanelSettings((prevSettings) => {
        const updatedSettings = { ...prevSettings, showOverlayBE: false };
        isOverlayVisibleRef.current = false; // Update ref state
        console.log("Overlay hidden, updated settings:", updatedSettings);
        return updatedSettings;
      });
    }
  };

  const showOverlay = () => {
    if (!isOverlayVisibleRef.current) {
      // Ensure this condition is met
      console.log("Showing overlay");
      setControlPanelSettings((prevSettings) => {
        const updatedSettings = { ...prevSettings, showOverlayBE: true };
        isOverlayVisibleRef.current = true; // Update ref state
        console.log("Overlay shown, updated settings:", updatedSettings);
        return updatedSettings;
      });
    }
  };

  // Hide overlay on game replay start
  useEffect(() => {
    const handleHideOverlay = () => hideOverlay();
    const unsubscribeReplayStart = subscribe(
      "game:replay_start",
      handleHideOverlay
    );
    return () => unsubscribeReplayStart();
  }, [subscribe]);

  // Show overlay on game replay end
  useEffect(() => {
    const handleShowOverlay = () => showOverlay();
    const unsubscribeReplayEnd = subscribe(
      "game:replay_end",
      handleShowOverlay
    );
    return () => unsubscribeReplayEnd();
  }, [subscribe]);

  // Show overlay on game start or clock update
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

  // Hide overlay when game ends
  useEffect(() => {
    const handleGameEnd = () => {
      if (isOverlayVisibleRef.current) {
        console.log("Game ending, hiding overlay after delay");
        setTimeout(() => hideOverlay(), 500); // Adds a slight delay
      }
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
