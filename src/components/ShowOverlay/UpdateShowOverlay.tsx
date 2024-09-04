import { useContext, useEffect, useRef } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export const UpdateShowOverlay = () => {
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const { subscribe } = useContext(WebsocketContext);

  // Ref to track if the overlay is currently being shown or hidden
  const isOverlayVisibleRef = useRef<boolean>(false);

  const hideOverlay = () => {
    if (isOverlayVisibleRef.current) {
      setControlPanelSettings((prevSettings) => {
        const updatedSettings = {
          ...prevSettings,
          showOverlayBE: false,
        };
        console.log("Overlay Hidden, updated settings: ", updatedSettings);
        isOverlayVisibleRef.current = false;
        return updatedSettings;
      });
    }
  };

  const showOverlay = () => {
    if (!isOverlayVisibleRef.current) {
      setControlPanelSettings((prevSettings) => {
        const updatedSettings = {
          ...prevSettings,
          showOverlayBE: true,
        };
        console.log("Overlay Shown, updated settings: ", updatedSettings);
        isOverlayVisibleRef.current = true;
        return updatedSettings;
      });
    }
  };

  useEffect(() => {
    const handleHideOverlay = (innerMessage: any) => {
      hideOverlay();
    };

    const unsubscribeReplayStart = subscribe(
      "game:replay_start",
      handleHideOverlay
    );
    return () => {
      unsubscribeReplayStart();
    };
  }, [subscribe]);

  useEffect(() => {
    const handleShowOverlay = (innerMessage: any) => {
      showOverlay();
    };

    const unsubscribeReplayEnd = subscribe(
      "game:replay_end",
      handleShowOverlay
    );
    return () => {
      unsubscribeReplayEnd();
    };
  }, [subscribe]);

  useEffect(() => {
    // Handling game start or clock start
    const handleGameStart = () => {
      showOverlay();
    };
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
    // Handling game pause or end
    const handleGameEnd = () => {
      hideOverlay();
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

  return null; // This component doesn't render anything
};
