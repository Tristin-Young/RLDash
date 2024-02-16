// // App.tsx
// import React, { useState } from 'react';
// import { WebsocketContext } from './contexts/WebsocketContext';
// import { GameInfoContext, DEFAULT_GAME_INFO } from './contexts/GameInfoContext';
// import { useWebSocketService } from './services/UseWebSocketService';
// import { Overlay } from './scenes/Overlay';

// function App() {
//     const websocketService = useWebSocketService();
//     const [gameInfo, setGameInfo] = useState(DEFAULT_GAME_INFO); // State for game info

//     return (
//         <WebsocketContext.Provider value={websocketService}>
//             <GameInfoContext.Provider value={{ gameInfo, setGameInfo }}>
//                 <Overlay />
//             </GameInfoContext.Provider>
//         </WebsocketContext.Provider>
//     );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WebsocketContext } from "./contexts/WebsocketContext";
import { GameInfoContext, DEFAULT_GAME_INFO } from "./contexts/GameInfoContext";
import { useWebSocketService } from "./services/UseWebSocketService";
import { Overlay } from "./scenes/Overlay";
import { ControlPanel } from "./components/ControlPanel/ControlPanel"; // Adjust the import path as needed
import {
  ControlPanelSettingsContext,
  DEFAULT_CONTROL_PANEL_SETTINGS,
} from "./contexts/ControlPanelSettingsContext";

function App() {
  const [controlPanelSettings, setControlPanelSettings] = useState(() => {
    const savedSettings = localStorage.getItem("controlPanelSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : DEFAULT_CONTROL_PANEL_SETTINGS;
  });
  const websocketService = useWebSocketService();
  const [gameInfo, setGameInfo] = useState(DEFAULT_GAME_INFO);
  return (
    <Router>
      {" "}
      {/* This wraps your routes in the Router component */}
      <ControlPanelSettingsContext.Provider
        value={{ controlPanelSettings, setControlPanelSettings }}
      >
        <WebsocketContext.Provider value={websocketService}>
          <GameInfoContext.Provider value={{ gameInfo, setGameInfo }}>
            <Routes>
              <Route path="/" element={<Overlay />} />
              <Route path="/ControlPanel" element={<ControlPanel />} />
            </Routes>
          </GameInfoContext.Provider>
        </WebsocketContext.Provider>
      </ControlPanelSettingsContext.Provider>
    </Router>
  );
}

export default App;
