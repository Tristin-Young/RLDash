// WebsocketContext.ts
import { createContext } from "react";

type WebSocketService = {
  subscribe: (type: string, callback: (data: any) => void) => () => void;
};

const defaultWebSocketContext: WebSocketService = {
  subscribe: () => () => {}, // Placeholder function
};

export const WebsocketContext = createContext<WebSocketService>(
  defaultWebSocketContext
);
