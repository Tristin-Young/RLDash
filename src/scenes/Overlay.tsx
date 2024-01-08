import { useContext, useEffect } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";
import { GameInfoContext } from "../contexts/GameInfoContext";
import { UpdateState } from "../models/UpdateState/UpdateState";
import { USPlayer } from "../models/USPlayer";
import { Scorebug } from "../components/Scorebug/Scorebug";

export const Overlay = () => {
  const websocket = useContext(WebsocketContext);
  const { gameInfo, setGameInfo } = useContext(GameInfoContext);
  useEffect(() => {
    websocket.subscribe("game", "update_state", (data: UpdateState) => {
      const updatedPlayers: USPlayer[] = Object.values(data.players).map(
        (playerInfo: USPlayer) => playerInfo
      );

      setGameInfo({
        arena: data.game.arena,
        isOT: data.game.isOT,
        isReplay: data.game.isReplay,
        target: data.game.target,
        timeRemaining: data.game.time_seconds,
        winner: data.game.winner,
        players: updatedPlayers,
        score: {
          blue: data.game.teams[0].score,
          orange: data.game.teams[1].score,
        },
      });
    });
  });
  return <Scorebug />;
};
