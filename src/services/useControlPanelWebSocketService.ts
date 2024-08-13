import { useEffect, useRef, useState } from "react";
import { DEFAULT_CONTROL_PANEL_SETTINGS } from "../contexts/ControlPanelSettingsContext";

type CallbackFunction = (data: any) => void; // Define the CallbackFunction type

let websocketInstance: WebSocket | null = null; // Ensuring single instance across the app

export const useControlPanelWebSocketService = () => {
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
    if (!websocketInstance) {
      // Ensure we only create one instance
      websocketInstance = new WebSocket("ws://localhost:42000");

      websocketInstance.onopen = () => {
        //console.log("Control Panel WebSocket connection established");
        websocketInstance?.send(JSON.stringify({ event: "loadSettings" }));
      };

      websocketInstance.onmessage = (event) => {
        const message = JSON.parse(event.data);
        //console.log("Control Panel WebSocket message received:", message);

        // Notify subscribers for the specific event
        if (message.event) {
          notifySubscribers(message.event, message.data);
        }
      };

      // websocketInstance.onclose = () =>
      //   console.log("Control Panel WebSocket disconnected (CLOSED)");
      // websocketInstance.onerror = (error) =>
      //   console.log("Control Panel WebSocket error (ERROR):", error);
    }

    return () => {
      // Do not close the WebSocket connection here to maintain the single instance
    };
  }, []); // Empty dependency array ensures this effect runs only once

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
    if (websocketInstance && websocketInstance.readyState === WebSocket.OPEN) {
      websocketInstance.send(
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
