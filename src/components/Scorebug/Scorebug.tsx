import { useContext } from "react";
import { GameInfoContext } from "../../contexts/GameInfoContext";
import {
  ScorebugBlue,
  ScorebugClock,
  ScorebugOrange,
  ScorebugWrapper,
} from "./Scorebug.style";
import { gameService } from "../../services/gameService";
import styled from 'styled-components';

export const Scorebug = () => {
  const { gameInfo } = useContext(GameInfoContext);

  return (
    <ScorebugWrapper>
      <ScorebugClock>
        {gameService.getClockFromSeconds(gameInfo.timeRemaining, gameInfo.isOT)}
      </ScorebugClock>
      <ScorebugBlue>BLUE {"   "}{gameInfo.score.blue}</ScorebugBlue>
      <ScorebugOrange>ORANGE {"   "}{gameInfo.score.orange}</ScorebugOrange>
    </ScorebugWrapper>
  );
};
