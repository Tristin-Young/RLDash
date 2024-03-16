import { useEffect, useRef, useState } from "react";
import { DEFAULT_CONTROL_PANEL_SETTINGS } from "../contexts/ControlPanelSettingsContext";

export const useControlPanelWebSocketService = () => {
  type CallbackFunction = (data: any) => void;
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [controlPanelSettings, setControlPanelSettings] = useState(
    DEFAULT_CONTROL_PANEL_SETTINGS
  );
  const subscribers = useRef<{ [key: string]: CallbackFunction[] }>({}).current;
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:42000");

    ws.onmessage = (event) => {
      const message = event;
      if (message.type === "loadSettings") {
        subscribers["loadSettings"]?.forEach((callback) => callback(message)); // Update local state with new settings
      } else if (message.type === "updateSettings") {
        subscribers["updateSettings"]?.forEach((callback) => callback(message)); // Update local state with new settings
      }
    };

    ws.onopen = () => {
      // Subscribe to multiple events after connecting
      ws.send(
        JSON.stringify({
          event: "wsControlPanel:register",
          data: "loadSettings",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsControlPanel:register",
          data: "updateSettings",
        })
      );
    };
    ws.onclose = () => console.log("WebSocket disconnected(CLOSED)");
    ws.onerror = (error) => console.log("WebSocket error(ERROR):", error);
    setWebSocket(webSocket);
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const subscribe = (
    type: string,
    callback: CallbackFunction
  ): (() => void) => {
    if (!subscribers[type]) {
      subscribers[type] = [];
    }
    subscribers[type].push(callback);

    // Return a function for unsubscribing
    return () => {
      subscribers[type] = subscribers[type].filter((cb) => cb !== callback);
    };
  };

  return {
    subscribe,
    controlPanelSettings,
    setControlPanelSettings,
  };
};
