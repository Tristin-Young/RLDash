import { useContext, useEffect } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import { gameService } from "../../services/gameService";
import {
  BoostMeterAmount,
  BoostMeterInnerCircle,
  BoostMeterOuterCircle,
  BoostMeterRing,
  BoostMeterSpeed,
  BoostMeterWrapper,
} from "./PlayerBoostMeter.style";
import { boostService } from "../../services/boostService";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformGameUpdate } from "../../contexts/transformGameUpdate";

export const PlayerBoostMeter = () => {
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  const { subscribe } = useContext(WebsocketContext); // Changed to useContext

  useEffect(() => {
    const handleGameUpdate = (innerMessage: any) => {
      console.log("innerMessage:", innerMessage);
      const gameContext = transformGameUpdate(innerMessage);
      console.log("gameContext:", gameContext);
      setGameInfo(gameContext);
    };

    // Subscribe and get the unsubscribe function
    const unsubscribe = subscribe("gamestate", handleGameUpdate);

    return () => {
      unsubscribe(); // Call the unsubscribe function on cleanup
    };
  }, [subscribe, setGameInfo]);

  const spectatedPlayer = gameService.getPlayerFromTarget(
    gameInfo.players,
    gameInfo.target
  );

  const normalizedRadius = 140 - 20 * 2; //inner radius - thickness of ring * 2
  const circumference = normalizedRadius * 2 * Math.PI;

  const PlayerTeam = spectatedPlayer?.team === 0 ? "blue" : "orange";

  return (
    <BoostMeterWrapper>
      {spectatedPlayer && (
        <svg height={140 * 2} width={140 * 2}>
          <BoostMeterOuterCircle
            stroke="grey"
            strokeDasharray={`${circumference} ${circumference}`}
            $dashOffset={boostService.getBoostBarCircumference(
              75,
              circumference
            )}
            strokeWidth={20}
            fill="transparent"
            r={normalizedRadius}
            cx={140}
            cy={140}
          />
          <BoostMeterInnerCircle
            fill="lightgrey"
            r={normalizedRadius - 10}
            cx={140}
            cy={140}
          />
          <BoostMeterRing
            stroke={PlayerTeam === "blue" ? "lightblue" : "#FFD580"}
            strokeDasharray={`${circumference} ${circumference}`}
            $dashOffset={boostService.getBoostBarCircumference(
              spectatedPlayer.boost * 0.75,
              circumference
            )}
            strokeWidth={20}
            fill="transparent"
            r={normalizedRadius}
            cx={140}
            cy={140}
          />
          <BoostMeterAmount
            fill="#000000"
            x="50%"
            y="42%"
            textAnchor="middle"
            dy=".3em"
          >
            {spectatedPlayer.boost}
          </BoostMeterAmount>
          <BoostMeterSpeed
            fill="#000000"
            x="50%"
            y="62%"
            textAnchor="middle"
            dy=".3em"
          >
            {spectatedPlayer.speed} KPH
          </BoostMeterSpeed>
        </svg>
      )}
    </BoostMeterWrapper>
  );
};
