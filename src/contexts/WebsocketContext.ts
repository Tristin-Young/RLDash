import { createContext } from "react";
import { websocketService } from "../services/websocketService";

export const WebsocketContext = createContext(websocketService)