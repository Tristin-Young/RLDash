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
import BoostPNG from '../../assets/Boost.png';
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
export const PlayerBoostMeter = () => {
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext
  const { controlPanelSettings } = useContext(ControlPanelSettingsContext);
 

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
      <svg height={140 * 2} width={140 * 2} style={{position: 'absolute', zIndex: 0}}>
        <BoostMeterRing
          stroke={PlayerTeam === "blue" ?  "#00E8F4" : "#F59323"}
          strokeDasharray={`${circumference} ${circumference}`}
          $dashOffset={boostService.getBoostBarCircumference(
            spectatedPlayer.boost * 0.75,
            circumference
          )}
          strokeWidth={45}
          fill="transparent"
          r={normalizedRadius}
          cx={115}
          cy={148}
        />
      </svg>

      {/* PNG Image */}
      <img src={BoostPNG} alt="BoostCircle" style={{zIndex: 1}}/>

      {/* Text SVG */}
      <svg height={140 * 2} width={140 * 2} style={{position: 'absolute', zIndex: 2}}>
        <BoostMeterAmount
          fill="white"
          x="61%"
          y="40%"
          textAnchor="middle"
          dy=".3em"
          fontSize="60px"
          fontWeight="bold"
          color="white"
        >
          {spectatedPlayer.boost}
        </BoostMeterAmount>
        <BoostMeterSpeed
          fill="white"
          x="61%"
          y="56%"
          textAnchor="middle"
          dy=".3em"
          fontSize="20px"
          fontWeight="bold"
        >
          {controlPanelSettings.metricOrImperial === "KPH" ? `${spectatedPlayer.speed} KPH` : `${(spectatedPlayer.speed * 0.621371).toFixed(0)} MPH`}
        </BoostMeterSpeed>
      </svg>
    </>
  )} 
</BoostMeterWrapper>

    
  );
};
