import { useContext, useEffect } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { gameService } from "../../services/gameService";
import {
  BoostMeterAmount,
  BoostMeterRing,
  BoostMeterSpeed,
  BoostMeterWrapper,
} from "./PlayerBoostMeter.style";
import { boostService } from "../../services/boostService";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import BoostPNG from '../../assets/GMUFocusedPlayerBoost.png';
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
export const PlayerBoostMeter = () => {
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext
  const { controlPanelSettings, setControlPanelSettings } = useContext(ControlPanelSettingsContext);
  
  useEffect(() => {
    // Logic that should run when controlPanelSettings changes
    //console.log("Updated settings:", controlPanelSettings);
  }, [controlPanelSettings]);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:42000');

    webSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'loadSettings' || message.type === 'updateSettings') {
          setControlPanelSettings(message.data); // Update local state with new settings
        }
      };

    return () => {
      if (webSocket.readyState === WebSocket.OPEN) webSocket.close();
    };
}, []);
  
  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      //console.log("innerMessage:", innerMessage);
      const gameContext = transformGameUpdate(innerMessage);
      //console.log("gameContext:", gameContext);
      setGameInfo(gameContext);
    };

    // Subscribe and get the unsubscribe function
    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
      unsubscribe(); // Call the unsubscribe function on cleanup
    };
  }, [subscribe, setGameInfo]);

  useEffect(() => {
    // Logic that should run when controlPanelSettings changes
    //console.log("Updated settings:", controlPanelSettings);
  }, [controlPanelSettings]);

  const spectatedPlayer = gameService.getPlayerFromTarget(
    gameInfo.players,
    gameInfo.target
  );

  const normalizedRadius = 120 - 20 * 2; //inner radius - thickness of ring * 2
  const circumference = normalizedRadius * 2 * Math.PI;

  const PlayerTeam = spectatedPlayer?.team === 0 ? "blue" : "orange";

  return (
<BoostMeterWrapper>
  {spectatedPlayer && (
    <>
      {/* Circle SVG */}
      <svg height={121 * 2} width={121 * 2} style={{position: 'absolute', zIndex: 0}}>
        <BoostMeterRing
          stroke={PlayerTeam === "blue" ?  controlPanelSettings.blueTeamColor : controlPanelSettings.orangeTeamColor}
          strokeDasharray={`${circumference} ${circumference}`}
          $dashOffset={boostService.getBoostBarCircumference(
            spectatedPlayer.boost * 0.75,
            circumference
          )}
          strokeWidth={55}
          fill="transparent"
          r={normalizedRadius}
          cx={121}
          cy={121}
        />
      </svg>

      {/* PNG Image */}
      <img src={BoostPNG} alt="BoostCircle" style={{zIndex: 1}}/>

      {/* Text SVG */}
      
      
      {controlPanelSettings.showPlayerSpeed === false && (
        <svg height={121 * 2} width={121 * 2} style={{position: 'absolute', zIndex: 2}}>
        <BoostMeterAmount
          fill="white"
          x="50%"
          y="47%"
          textAnchor="middle"
          dy=".3em"
          fontSize="120px"
          fontWeight="bold"
          color="white"
        >
          {spectatedPlayer.boost}
        </BoostMeterAmount>
        </svg>)}
        {controlPanelSettings.showPlayerSpeed === true && (
         <svg height={121 * 2} width={121 * 2} style={{position: 'absolute', zIndex: 2}}>
         <BoostMeterAmount
           fill="white"
           x="50%"
           y="45%"
           textAnchor="middle"
           dy=".3em"
           fontSize="112px"
           fontWeight="bold"
           color="white"
         >
           {spectatedPlayer.boost}
         </BoostMeterAmount> 
        <BoostMeterSpeed
          fill="white"
          x="50%"
          y="68%"
          textAnchor="middle"
          dy=".3em"
          fontSize="32px"
          fontWeight="bold"
        >
          {controlPanelSettings.metricOrImperial === "KPH" ? `${spectatedPlayer.speed} KPH` : `${(spectatedPlayer.speed * 0.621371).toFixed(0)} MPH`}
        </BoostMeterSpeed>
        </svg>
        )}
      
    </>
  )} 
</BoostMeterWrapper>

    
  );
};
