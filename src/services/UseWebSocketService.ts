import { useState, useEffect, useRef } from "react";

type Player = {
  name: string;
  hasFlip: boolean;
};

type TeamData = {
  [key: string]: Player[];
};

type CallbackFunction = (data: any) => void;

const GAME_WS_URL = process.env.REACT_APP_GAME_WS_URL || "ws://localhost:49322";
const PLAYER_WS_URL = process.env.REACT_APP_PLAYER_WS_URL || "ws://localhost:43003";

export const useWebSocketService = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const subscribers = useRef<{ [key: string]: CallbackFunction[] }>({});

  useEffect(() => {
    const ws = new WebSocket(GAME_WS_URL);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.event === "game:update_state") {
        const innerMessage = message.data;
        if (innerMessage.event === "gamestate") {
          subscribers.current["gamestate"]?.forEach((callback) => callback(innerMessage));
        }
      }
    };

    ws.onopen = () => ws.send(JSON.stringify({ event: "wsRelay:register", data: "game:update_state" }));
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (error) => console.log("WebSocket error:", error);

    setWebSocket(ws);

    // Ensure the cleanup function returns void
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const subscribe = (type: string, callback: CallbackFunction): (() => void) => {
    subscribers.current[type] = subscribers.current[type] || [];
    subscribers.current[type].push(callback);
    return () => {
      subscribers.current[type] = subscribers.current[type].filter(cb => cb !== callback);
    };
  };

  return { subscribe };
};

export const usePlayerWebSocketService = () => {
  const [team0Players, setTeam0Players] = useState<Player[]>([]);
  const [team1Players, setTeam1Players] = useState<Player[]>([]);

  useEffect(() => {
    const ws = new WebSocket(PLAYER_WS_URL);
    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const data = JSON.parse(event.data);
      // Ensure correct type assertion for players
      const teams = parseTeamData(data);
      setTeam0Players(teams.team0);
      setTeam1Players(teams.team1);
    };

    ws.onopen = () => console.log("Connected to Player WebSocket");
    ws.onerror = (error) => console.log("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  function parseTeamData(rawData: any): TeamData {
    const teamsData: TeamData = { team0: [], team1: [] };
    // Correctly type 'players' as any[] to resolve 'unknown' type issue
    Object.entries(rawData.teams).forEach(([teamName, players]: [string, unknown]) => {
      teamsData[teamName] = (players as any[]).map((playerData: any) => ({
        name: playerData.name,
        hasFlip: playerData.hasFlip,
      }));
    });
    return teamsData;
  }

  return { team0Players, team1Players };
};
