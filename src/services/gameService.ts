import { USPlayer } from "../models/USPlayer";
import { USGame } from "../models/UpdateState/USGame";

const getBlueTeamName = (USGame: USGame): string => {
  return USGame.teams[0].name;
};

const getOrangeTeamName = (USGame: USGame): string => {
  return USGame.teams[0].name;
};

const getBlueTeam = (players: USPlayer[]): USPlayer[] => {
  return players.filter((player) => player.team === 0);
};

const getOrangeTeam = (players: USPlayer[]): USPlayer[] => {
  return players.filter((player) => player.team === 1);
};

const getPlayerFromTarget = (
  players: USPlayer[],
  target: string
): USPlayer | undefined => {
  if (Array.isArray(players)) {
  return players.find((player) => target.includes(player.name));
  }
};

const getClockFromSeconds = (seconds: number, isOT: boolean): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (isOT) {
    return `+ ${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  }

  return `${minutes}:${
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
  }`;
};

const getScoreFromPlayers = (players: USPlayer[]) => {
  return players.map((player) => player.score);
};

const getGoalsFromPlayers = (players: USPlayer[]) => {
  return players.map((player) => player.goals);
};

const getAssistFromPlayers = (players: USPlayer[]) => {
  return players.map((player) => player.assists);
};

const getShotsFromPlayers = (players: USPlayer[]) => {
  return players.map((player) => player.shots);
};

const getSavesFromPlayers = (players: USPlayer[]) => {
  return players.map((player) => player.saves);
};

const getDemosFromPlayers = (players: USPlayer[]) => {
  return players.map((player) => player.demos);
};

export const gameService = {
  getBlueTeamName,
  getOrangeTeamName,
  getBlueTeam,
  getOrangeTeam,
  getPlayerFromTarget,
  getClockFromSeconds,
  getScoreFromPlayers,
  getGoalsFromPlayers,
  getAssistFromPlayers,
  getShotsFromPlayers,
  getSavesFromPlayers,
  getDemosFromPlayers,
};
