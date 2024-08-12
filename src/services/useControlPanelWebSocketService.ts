import { useEffect, useRef, useState } from "react";
import { DEFAULT_CONTROL_PANEL_SETTINGS } from "../contexts/ControlPanelSettingsContext";

export const useControlPanelWebSocketService = () => {
  type CallbackFunction = (data: any) => void;

  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [controlPanelSettings, setControlPanelSettings] = useState(
    DEFAULT_CONTROL_PANEL_SETTINGS
  );

  const subscribers = useRef<{ [key: string]: CallbackFunction[] }>({}).current;

  // Function to notify all subscribers about a specific event
  const notifySubscribers = (type: string, data: any) => {
    if (subscribers[type]) {
      subscribers[type].forEach((callback) => callback(data));
    }
  };

  // Setup WebSocket connection and message handling
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:42000");

    ws.onopen = () => {
      console.log("Control Panel WebSocket connection established");
      ws.send(JSON.stringify({ event: "loadSettings" }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Control Panel WebSocket message received:", message);

      // Notify subscribers for the specific event
      if (message.event) {
        notifySubscribers(message.event, message.data);
      }
    };

    ws.onclose = () =>
      console.log("Control Panel WebSocket disconnected (CLOSED)");
    ws.onerror = (error) =>
      console.log("Control Panel WebSocket error (ERROR):", error);

    setWebSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  // Subscribe function to allow components to subscribe to specific events
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

  // Update settings and send them to the server via WebSocket
  const updateSettings = (newSettings: any) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(
        JSON.stringify({ event: "updateSettings", data: newSettings })
      );
    } else {
      console.error("WebSocket is not open, cannot send updateSettings");
    }
  };

  return {
    subscribe,
    controlPanelSettings,
    setControlPanelSettings,
    updateSettings,
  };
};
