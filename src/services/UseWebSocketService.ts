// useWebSocketService.ts
import { useState, useEffect, useRef } from 'react';

type CallbackFunction = (data: any) => void;

export const useWebSocketService = () => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const subscribers = useRef<{ [key: string]: CallbackFunction[] }>({}).current;

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:49322'); // Your WebSocket URL

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            // Check for the outer event type
            if (message.event === "game:update_state") {
                // Now handle the inner event data
                const innerMessage = message.data;
                if (innerMessage.event === "gamestate") {
                    subscribers["gamestate"]?.forEach(callback => callback(innerMessage));
                }
            }
        };

        ws.onopen = () => {
            // Subscribe to 'game:update_state' after connecting
            ws.send(JSON.stringify({
                event: "wsRelay:register",
                data: "game:update_state"
            }));
        };

        ws.onclose = () => console.log('WebSocket disconnected(CLOSED)');
        ws.onerror = (error) => console.log('WebSocket error(ERROR):', error);

        setWebSocket(ws);

        return () => {
            if (ws) ws.close();
        };
    }, []);

    const subscribe = (type: string, callback: CallbackFunction): (() => void) => {
        if (!subscribers[type]) {
            subscribers[type] = [];
        }
        subscribers[type].push(callback);

        // Return a function for unsubscribing
        return () => {
            subscribers[type] = subscribers[type].filter(cb => cb !== callback);
        };
    };

    return { subscribe };
};
