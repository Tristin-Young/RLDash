import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WebsocketContext } from "./contexts/WebsocketContext";
import { ControlPanelSettingsContext } from "./contexts/ControlPanelSettingsContext";
import { useWebSocketService } from "./services/UseWebSocketService";
import { useControlPanelWebSocketService } from "./services/useControlPanelWebsSocketService";
import { Overlay } from "./scenes/Overlay";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import {
  DEFAULT_UPDATESTATE,
  UpdateStateContext,
} from "./contexts/UpdateStateContext";

function App() {
  const websocketService = useWebSocketService();
  const controlPanelService = useControlPanelWebSocketService();
  const [updateState, setUpdateState] = useState(DEFAULT_UPDATESTATE);

  return (
    <Router>
      <ControlPanelSettingsContext.Provider value={controlPanelService}>
        <WebsocketContext.Provider value={websocketService}>
          <UpdateStateContext.Provider value={{ updateState, setUpdateState }}>
            <Routes>
              <Route path="/" element={<Overlay />} />
              <Route path="/ControlPanel" element={<ControlPanel />} />
            </Routes>
          </UpdateStateContext.Provider>
        </WebsocketContext.Provider>
      </ControlPanelSettingsContext.Provider>
    </Router>
  );
}

export default App;
