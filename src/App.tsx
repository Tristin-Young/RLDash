// App.tsx
import React, { useState } from 'react';
import { WebsocketContext } from './contexts/WebsocketContext';
import { GameInfoContext, DEFAULT_GAME_INFO } from './contexts/GameInfoContext';
import { useWebSocketService } from './services/UseWebSocketService';
import { Overlay } from './scenes/Overlay';

function App() {
    const websocketService = useWebSocketService();
    const [gameInfo, setGameInfo] = useState(DEFAULT_GAME_INFO); // State for game info

    return (
        <WebsocketContext.Provider value={websocketService}>
            <GameInfoContext.Provider value={{ gameInfo, setGameInfo }}>
                <Overlay />
            </GameInfoContext.Provider>
        </WebsocketContext.Provider>
    );
}

export default App;
