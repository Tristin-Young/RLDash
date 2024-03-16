import { updateState } from "../models/UpdateState/UpdateState";
import { GameContext } from "../models/contexts/GameContext";

// transformGameUpdate.js
export const transformGameUpdate = (data: any) => {
  const gameData = data.game;

  const removePlayerName = (players: any) => {
    const playerArray = [];
    for (const player in players) {
      playerArray.push(players[player]);
    }
    return playerArray;
  };
  //update gameData.teams to be an array of objects
  data.players = removePlayerName(data.players);
  //console.log("data.players:", data.players);

  //console.log("data:", data);

  // Use optional chaining and nullish coalescing to provide fallback values
  return {
    event: data.event,
    game: {
      arena: gameData.arena,
      ball: {
        location: {
          X: gameData.ball?.location?.X ?? 0,
          Y: gameData.ball?.location?.Y ?? 0,
          Z: gameData.ball?.location?.Z ?? 0,
        },
        speed: gameData.ball?.speed ?? 0,
        team: gameData.ball?.team ?? 0,
      },
      hasTarget: gameData.hasTarget,
      hasWinner: gameData.hasWinner,
      isOT: gameData.isOT,
      isReplay: gameData.isReplay,
      target: gameData.target,
      teams: gameData.teams,
      time_milliseconds: gameData.time_milliseconds,
      time_seconds: gameData.time_seconds,
      winner: gameData.winner,
    },
    hasGame: data.hasGame,
    match_guid: data.match_guid,
    players: data.players,
  };
};
