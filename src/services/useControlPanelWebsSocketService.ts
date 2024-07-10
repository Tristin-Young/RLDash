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
      const message = JSON.parse(event.data);
      console.log("WebSocket message received:", message);
      if (message.event in subscribers) {
        console.log(
          "Notifying subscribers for event:",
          message.event,
          "with data:",
          message.data
        );
        subscribers[message.event].forEach((callback) =>
          callback(message.data)
        );
      }
    };

    ws.onopen = () => {
      console.log("WebSocket connection established");
      ws.send(JSON.stringify({ event: "loadSettings" }));
    };

    ws.onclose = () => console.log("WebSocket disconnected(CLOSED)");
    ws.onerror = (error) => console.log("WebSocket error(ERROR):", error);
    setWebSocket(ws);

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

    return () => {
      subscribers[type] = subscribers[type].filter((cb) => cb !== callback);
    };
  };

  const updateSettings = (newSettings: any) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(
        JSON.stringify({ event: "updateSettings", data: newSettings })
      );
    }
  };

  return {
    subscribe,
    controlPanelSettings,
    setControlPanelSettings,
    updateSettings,
  };
};
