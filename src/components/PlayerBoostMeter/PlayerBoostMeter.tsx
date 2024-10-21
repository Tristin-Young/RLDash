import { useContext, useEffect } from "react";
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
import BoostPNG from "../../assets/Boost_GMU.png";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { USPlayer } from "../../models/USPlayer";
export const PlayerBoostMeter = () => {
  const { updateState, setUpdateState } = useContext(UpdateStateContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext
  const { controlPanelSettings } = useContext(ControlPanelSettingsContext);

  useEffect(() => {
    // Logic that should run when controlPanelSettings changes
    //console.log("Updated settings:", controlPanelSettings);
  }, [controlPanelSettings]);

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      if (innerMessage.event === "gamestate") {
        const gameContext = transformGameUpdate(innerMessage);
        setUpdateState(gameContext);
      }
    };

    // Subscribe and get the unsubscribe function
    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
      unsubscribe(); // Call the unsubscribe function on cleanup
    };
  }, [subscribe, setUpdateState]);

  const spectatedPlayer = gameService.getPlayerFromTarget(
    updateState.players as USPlayer[],
    updateState.game.target
  );

  const normalizedRadius = 121 - 20 * 2; //inner radius - thickness of ring * 2
  const circumference = normalizedRadius * 2 * Math.PI;

  const PlayerTeam = spectatedPlayer?.team === 0 ? "blue" : "orange";

  return (
    <BoostMeterWrapper>
      {spectatedPlayer && (
        <>
          {/* Circle SVG */}
          <svg
            height={121 * 2}
            width={121 * 2}
            style={{ position: "absolute", zIndex: 0 }}
          >
            <BoostMeterRing
              stroke={
                PlayerTeam === "blue"
                  ? controlPanelSettings.blueTeamColor
                  : controlPanelSettings.orangeTeamColor
              }
              strokeDasharray={`${circumference} ${circumference}`}
              $dashOffset={boostService.getBoostBarCircumference(
                spectatedPlayer.boost * 1,
                circumference
              )}
              strokeWidth={50}
              fill="transparent"
              r={normalizedRadius}
              cx={104}
              cy={140}
            />
          </svg>

          {/* PNG Image */}
          <img src={BoostPNG} alt="BoostCircle" style={{ zIndex: 0 }} />

          {/* Text SVG */}

          {controlPanelSettings.SpeedBoostMeter === "Speed" && (
            <svg
              height={121 * 2}
              width={121 * 2}
              style={{ position: "absolute", zIndex: 2 }}
            >
              <BoostMeterSpeed
                fill="white"
                x="50%"
                y="39%"
                textAnchor="middle"
                dy=".3em"
                fontSize="105px"
                fontWeight="bold"
              >
                {controlPanelSettings.metricOrImperial === "KPH"
                  ? `${spectatedPlayer.speed}`
                  : `${(spectatedPlayer.speed * 0.621371).toFixed(0)}`}
              </BoostMeterSpeed>
              <BoostMeterSpeed
                fill="white"
                x="50%"
                y="62%"
                textAnchor="middle"
                dy=".3em"
                fontSize="62px"
                fontWeight="bold"
              >
                {controlPanelSettings.metricOrImperial === "KPH"
                  ? ` KPH`
                  : `MPH`}
              </BoostMeterSpeed>
            </svg>
          )}
          {controlPanelSettings.SpeedBoostMeter === "Boost" && (
            <svg
              height={121 * 2}
              width={121 * 2}
              style={{ position: "absolute", zIndex: 2 }}
            >
              <BoostMeterAmount
                fill="white"
                x="50%"
                y="48%"
                textAnchor="middle"
                dy=".3em"
                fontSize="115px"
                fontWeight="bold"
                color="white"
              >
                {spectatedPlayer.boost}
              </BoostMeterAmount>
            </svg>
          )}
          {controlPanelSettings.SpeedBoostMeter === "Both" && (
            <svg
              height={121 * 2}
              width={121 * 2}
              style={{ position: "absolute", zIndex: 2 }}
            >
              <BoostMeterAmount
                fill="white"
                x="50%"
                y="43%"
                textAnchor="middle"
                dy=".3em"
                fontSize="105px"
                fontWeight="bold"
                color="white"
              >
                {spectatedPlayer.boost}
              </BoostMeterAmount>
              <BoostMeterSpeed
                fill="white"
                x="50%"
                y="66%"
                textAnchor="middle"
                dy=".3em"
                fontSize="44px"
                fontWeight="bold"
              >
                {controlPanelSettings.metricOrImperial === "KPH"
                  ? `${spectatedPlayer.speed} KPH`
                  : `${(spectatedPlayer.speed * 0.621371).toFixed(0)} MPH`}
              </BoostMeterSpeed>
            </svg>
          )}
          {controlPanelSettings.SpeedBoostMeter === "None" && (
            <svg
              height={121 * 2}
              width={121 * 2}
              style={{ position: "absolute", zIndex: 2 }}
            ></svg>
          )}
        </>
      )}
    </BoostMeterWrapper>
  );
};
