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

export const useWebSocketService = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const subscribers = useRef<{ [key: string]: CallbackFunction[] }>({}).current;

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:49322"); // Your WebSocket URL

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Check for the outer event type
      if (message.event === "game:update_state") {
        // Now handle the inner event data
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage.players);
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "gamestate") {
          subscribers["gamestate"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:initialized") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:initialized") {
          subscribers["game:initialized"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:pre_countdown_begin") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:pre_countdown_begin") {
          subscribers["game:pre_countdown_begin"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:post_countdown_begin") {
        //console.log("message - gamepostcountdown touched:", message);
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:post_countdown_begin") {
          subscribers["game:post_countdown_begin"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:round_started_go") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:round_started_go") {
          subscribers["game:round_started_go"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:clock_started") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:clock_started") {
          subscribers["game:clock_started"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:clock_stopped") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:clock_stopped") {
          subscribers["game:clock_stopped"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:clock_updated_seconds") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:clock_updated_seconds") {
          subscribers["game:clock_updated_seconds"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:ball_hit") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:ball_hit") {
          subscribers["game:ball_hit"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:statfeed_event") {
        //console.log("game:statfeed_event message recieved (NAMED BELOW)");
        //console.log("game:statfeed_event message:", message);
        const innerMessage = message;
        // console.log(
        //   "InnerMessage.data.event_name:",
        //   innerMessage.data.event_name
        // );
        // console.log("InnerMessage.data.type:", innerMessage.data.type);

        if (innerMessage.event === "game:statfeed_event") {
          if (innerMessage.data.type === "Shot on Goal") {
            // console.log("game:statfeed_event_shotOnGoal message recieved");
            subscribers["game:statfeed_event_shotOnGoal"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Goal") {
            // console.log("game:statfeed_event_goal message recieved");
            subscribers["game:statfeed_event_goal"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Assist") {
            // console.log("game:statfeed_event_assist message recieved");
            subscribers["game:statfeed_event_assist"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Demolition") {
            // console.log("game:statfeed_event_demolition message recieved");
            subscribers["game:statfeed_event_demolition"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Epic Save") {
            // console.log("game:statfeed_event_epicSave message recieved");
            subscribers["game:statfeed_event_epicSave"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Save") {
            // console.log("game:statfeed_event_save message recieved");
            subscribers["game:statfeed_event_save"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "Win") {
            //console.log("game:statfeed_event_win message recieved");
            subscribers["game:statfeed_event_win"]?.forEach((callback) =>
              callback(innerMessage)
            );
          } else if (innerMessage.data.type === "MVP") {
            console.log("game:statfeed_event_MVP message recieved");
            subscribers["game:statfeed_event_MVP"]?.forEach((callback) =>
              callback(innerMessage)
            );
          }
        }
      } else if (message.event === "game:goal_scored") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:goal_scored") {
          subscribers["game:goal_scored"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:replay_start") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:replay_start") {
          subscribers["game:replay_start"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:replay_will_end") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:replay_will_end") {
          subscribers["game:replay_will_end"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:replay_end") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:replay_end") {
          subscribers["game:replay_end"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      } else if (message.event === "game:podium_start") {
        const innerMessage = message.data;
        //console.log("innerMessage:", innerMessage);
        if (innerMessage.event === "game:podium_start") {
          subscribers["game:podium_start"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      }
    };

    ws.onopen = () => {
      // Subscribe to multiple events after connecting
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:update_state",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:pre_countdown_begin",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:post_countdown_begin",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:round_started_go",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:clock_started",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:clock_stopped",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:clock_updated_seconds",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:ball_hit",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:statfeed_event",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:goal_scored",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:replay_start",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:replay_will_end",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:replay_end",
        })
      );
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:podium_start",
        })
      );
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
      console.log("WebSocket message received:", event.data);
      const data = JSON.parse(event.data);
      // Parse the team data using our function
      const teams = parseTeamData(data);

      // Update state with the new team data
      setTeam0Players(teams.team0);
      setTeam1Players(teams.team1);
    };

    ws.onopen = () => console.log("Connected to Player WebSocket[43003]");
    ws.onerror = (error) => console.log("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return { team0Players, team1Players };
};
