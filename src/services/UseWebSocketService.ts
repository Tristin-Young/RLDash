// useWebSocketService.ts
import { useState, useEffect, useRef } from "react";

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
        if (innerMessage.event === "gamestate") {
          subscribers["gamestate"]?.forEach((callback) =>
            callback(innerMessage)
          );
        }
      }
    };

    ws.onopen = () => {
      // Subscribe to 'game:update_state' after connecting
      ws.send(
        JSON.stringify({
          event: "wsRelay:register",
          data: "game:update_state",
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
          Object.entries(rawData.teams).forEach(([teamName, players]: [string, any]) => {
              // Map each player to a simpler object structure
              const parsedPlayers = Object.entries(players).map(([_, playerData]: [string, any]) => ({
                  name: playerData.name,
                  hasFlip: playerData.hasFlip,
              }));
  
              // Assign the parsed players to the correct team in our teamsData object
              teamsData[teamName as keyof TeamData] = parsedPlayers;
          });
  
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
