// useWebSocketService.ts
import { useState, useEffect, useRef } from "react";
import { DEFAULT_CONTROL_PANEL_SETTINGS } from "../contexts/ControlPanelSettingsContext";

// Define a type for player data for better type checking and autocomplete
type Player = {
  name: string;
  hasFlip: boolean;
};

// Define a type for the team data structure
type TeamData = {
  [key: string]: Player[];
};

type CallbackFunction = (data: any) => void;

// Global WebSocket instance to ensure a singleton pattern
let globalWebSocket: WebSocket | null = null;

export const useWebSocketService = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const subscribers = useRef<{ [key: string]: CallbackFunction[] }>({}).current;

  useEffect(() => {
    // Check if the globalWebSocket is already created
    if (!globalWebSocket) {
      globalWebSocket = new WebSocket("ws://localhost:49322"); // Your WebSocket URL

      globalWebSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        // Check for the outer event type
        if (message.event === "game:update_state") {
          const innerMessage = message.data;
          if (innerMessage.event === "gamestate") {
            subscribers["gamestate"]?.forEach((callback) =>
              callback(innerMessage)
            );
          }
        } else if (message.event === "game:initialized") {
          const innerMessage = message.data;
          subscribers["game:initialized"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:pre_countdown_begin") {
          const innerMessage = message.data;
          subscribers["game:pre_countdown_begin"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:post_countdown_begin") {
          const innerMessage = message.data;
          subscribers["game:post_countdown_begin"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:round_started_go") {
          const innerMessage = message.data;
          subscribers["game:round_started_go"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:clock_started") {
          const innerMessage = message.data;
          subscribers["game:clock_started"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:clock_stopped") {
          const innerMessage = message.data;
          subscribers["game:clock_stopped"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:clock_updated_seconds") {
          const innerMessage = message.data;
          subscribers["game:clock_updated_seconds"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:ball_hit") {
          const innerMessage = message.data;
          subscribers["game:ball_hit"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:statfeed_event") {
          const innerMessage = message;
          if (innerMessage.data.type === "Shot on Goal") {
            subscribers["game:statfeed_event_shotOnGoal"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Goal") {
            subscribers["game:statfeed_event_goal"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Assist") {
            subscribers["game:statfeed_event_assist"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Demolition") {
            subscribers["game:statfeed_event_demolition"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Epic Save") {
            subscribers["game:statfeed_event_epicSave"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Save") {
            subscribers["game:statfeed_event_save"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Win") {
            subscribers["game:statfeed_event_win"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "MVP") {
            subscribers["game:statfeed_event_MVP"]?.forEach((callback) =>
              callback(innerMessage)
            );
          }
        } else if (message.event === "game:goal_scored") {
          const innerMessage = message.data;
          subscribers["game:goal_scored"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:replay_start") {
          const innerMessage = message.data;
          subscribers["game:replay_start"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:replay_will_end") {
          const innerMessage = message.data;
          subscribers["game:replay_will_end"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:replay_end") {
          const innerMessage = message.data;
          subscribers["game:replay_end"]?.forEach((callback) =>
            callback(innerMessage)
          );
        } else if (message.event === "game:podium_start") {
          const innerMessage = message.data;
          subscribers["game:podium_start"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      };

      globalWebSocket.onopen = () => {
        //console.log("WebsocketService WebSocket connected");
        // Subscribe to multiple events after connecting
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:update_state",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:pre_countdown_begin",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:post_countdown_begin",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:round_started_go",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:clock_started",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:clock_stopped",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:clock_updated_seconds",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:ball_hit",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:statfeed_event",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:goal_scored",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:replay_start",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:replay_will_end",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:replay_end",
          })
        );
        globalWebSocket!.send(
          JSON.stringify({
            event: "wsRelay:register",
            data: "game:podium_start",
          })
        );
      };

      // globalWebSocket.onclose = () =>
      //   console.log("WebSocket disconnected(CLOSED)");
      // globalWebSocket.onerror = (error) =>
      //   console.log("WebSocket error(ERROR):", error);
    }

    setWebSocket(globalWebSocket);

    return () => {
      if (globalWebSocket && globalWebSocket.readyState === WebSocket.OPEN) {
        globalWebSocket.close();
        globalWebSocket = null;
      }
    };
  }, [subscribers]);

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

  return { subscribe };
};

export const usePlayerWebSocketService = () => {
  // Use state hooks to store team players data
  const [team0Players, setTeam0Players] = useState<Player[]>([]);
  const [team1Players, setTeam1Players] = useState<Player[]>([]);

  // Function to parse incoming data into the desired structure
  const parseTeamData = (rawData: any): TeamData => {
    const teamsData: TeamData = { team0: [], team1: [] };

    // Loop through each team in the rawData
    Object.entries(rawData.teams).forEach(
      ([teamName, players]: [string, any]) => {
        // Map each player to a simpler object structure
        const parsedPlayers = Object.entries(players).map(
          ([_, playerData]: [string, any]) => ({
            name: playerData.name,
            hasFlip: playerData.hasFlip,
          })
        );

        // Assign the parsed players to the correct team in our teamsData object
        teamsData[teamName as keyof TeamData] = parsedPlayers;
      }
    );

    return teamsData;
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:43003");

    ws.onmessage = (event) => {
      //console.log("WebSocket message received:", event.data);
      const data = JSON.parse(event.data);
      // Parse the team data using our function
      const teams = parseTeamData(data);

      // Update state with the new team data
      setTeam0Players(teams.team0);
      setTeam1Players(teams.team1);
    };

    ws.onopen = () => console.log("Connected to Player WebSocket[43003]");
    // ws.onerror = (error) => console.log("WebSocket error:", error);
    // ws.onclose = () => console.log("WebSocket disconnected");

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return { team0Players, team1Players };
};
