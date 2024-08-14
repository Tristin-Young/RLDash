import { useContext, useEffect } from "react";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export const UpdateShowOverlay = () => {
  const { updateState } = useContext(UpdateStateContext);
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const { subscribe } = useContext(WebsocketContext);

  useEffect(() => {
    const handleHideOverlay = (innerMessage: any) => {
      if (innerMessage.event === "game:replay_start") {
        console.log("Replay Started");
        setControlPanelSettings((prevSettings) => ({
          ...prevSettings,
          showOverlayBE: false,
        }));
      }
    };
    const unsubscribe = subscribe("game:replay_start", handleHideOverlay);

    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  useEffect(() => {
    const handleShowOverlay = (innerMessage: any) => {
      if (innerMessage.event === "game:replay_end") {
        console.log("Replay Ended");
        setControlPanelSettings((prevSettings) => ({
          ...prevSettings,
          showOverlayBE: true,
        }));
      }
    };
    const unsubscribe = subscribe("game:replay_end", handleShowOverlay);

    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  return null; // This component doesn't render anything
};
