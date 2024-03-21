import styled from "styled-components";

// the entire scorebug is 1000px by 170px
// position is at X=460, Y=0
export const ScorebugWrapper = styled.div`
  height: auto;
  width: 1000px;
  position: absolute;
  top: 0px;
  left: 460px;
`;

// create a div for the creator banner
// size it to 850px by 35px
// position is at X=535, Y=0
// relative to scorebugWraper, position is X=75, Y=0
export const ScorebugCreatorBanner = styled.div`
  height: 35px;
  width: 824px;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  position: absolute;
  top: 0px;
  left: 86px;
  color: black;
`;

// create a div for the blue teams logo
// size it to 85 by 70 px
// position is at X=460, Y=35
// relative to scorebugWraper, position is X=0, Y=35
export const ScorebugBlueLogo = styled.div`
  display: flex;
  height: 62px;
  width: 75px;
  position: absolute;
  top: 38px;
  left: 40px;
  justify-content: center;
  > img {
    height: 100%;
  }
`;

// create a div for the blue teams name
// size it to 265px by 70px
// position is at X=545, Y=35
// relative to scorebugWraper, position is X=85, Y=35
//give background color of green at 30% opacity
export const ScorebugBlueName = styled.div`
  height: 44px;
  width: 218px;
  font-size: 52px;
  position: absolute;
  top: 44px;
  left: 140px;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

// create a div for the blue teams score
// size it to 75px by 65px
// position is at X=810, Y=35
// relative to scorebugWraper, position is X=350, Y=35
export const ScorebugBlueScore = styled.div`
  height: 38px;
  width: 53px;
  position: absolute;
  top: 49px;
  left: 370px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 58px;
`;

// create a div for the clock
// size it to 150px by 65px
// position is at X=885, Y=35
// relative to scorebugWraper, position is X=425, Y=35
export const ScorebugClock = styled.div`
  height: 52px;
  width: 116px;
  position: absolute;
  top: 42px;
  left: 442px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 48px;
`;

// create a div for the orange teams score
// size it to 75px by 65px
// position is at X=1035, Y=35
// relative to scorebugWraper, position is X=575, Y=35
export const ScorebugOrangeScore = styled.div`
  height: 38px;
  width: 53px;
  position: absolute;
  top: 49px;
  right: 370px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 58px;
`;

// create a div for the orange teams name
// size it to 265px by 70px
// position is at X=1100, Y=35
// relative to scorebugWraper, position is X=640, Y=35
export const ScorebugOrangeName = styled.div`
  height: 44px;
  width: 218px;
  font-size: 54px;
  position: absolute;
  top: 44px;
  right: 140px;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

// create a div for the blue teams logo
// size it to 85 by 70 px
// position is at X=1375, Y=35
// relative to scorebugWraper, position is X=915, Y=35
export const ScorebugOrangeLogo = styled.div`
  display: flex;
  justify-content: center;
  height: 62px;
  width: 75px;
  position: absolute;
  top: 38px;
  right: 40px;

  > img {
    height: 100%;
  }
`;

// create a div for the win percentage
// size it to 290px by 30px
//position is at X=460, Y=105
// relative to scorebugWraper, position is X=355, Y=100
// width is the width of the bluescore + the width of the clock + the width of the orangescore
export const ScorebugWinPercentage = styled.div`
  height: 24px;
  width: 209px;
  color: white;
  position: absolute;
  top: 127px;
  left: 396px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

export const ScorebugSeriesScore = styled.div`
  height: 24px;
  width: 209px;
  color: white;
  position: absolute;
  top: 99px;
  left: 396px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;
export const ScorebugSeriesScoreAndWinPercentage = styled.div`
  height: 52px;
  width: 209px;
  color: white;
  position: absolute;
  top: 99px;
  left: 396px;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  div {
    position: relative;
    top: -1px;
    padding-bottom: 2px;
  }
`;
// Styled wrapper for SVGs
export const ScorebugSvgWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 460px;
  width: 1000px; /* Ensure this matches the actual width of your PNG for proper alignment */
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;
export const OrangeUndertone = styled.div`
  position: absolute;
  top: 30px;
  left: 1040px;
  width: 30px;
  height: 100px;
  opacity: 1;
  z-index: -1;
`;

export const BlueUndertone = styled.div`
  position: absolute;
  top: 30px;
  left: 850px;
  width: 30px;
  height: 100px;
  opacity: 1;
  z-index: -1;
`;

export const CanaSVGwrapper = styled.div`
  position: absolute;
  z-index: -1;
  //top: 1015px;
  top: 3px;
  left: 1775px;
  width: 150px; /* Ensure this matches the actual width of your PNG for proper alignment */
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const SeriesScoreUndertone = styled.div`
  position: absolute;
  top: 95px;
  left: 595px;
  width: 235px;
  height: 20px;
  z-index: -1;
  opacity: 0.8;
`;

export const OrangeSeriesScoreUndertone = styled.div`
  position: absolute;
  top: 95px;
  left: 1090px;
  width: 240px;
  height: 20px;
  z-index: -1;
  opacity: 0.8;
`;

export const DarkSeriesScoreUndertone = styled.div`
  position: absolute;
  top: 95px;
  left: 595px;
  width: 740px;
  height: 20px;
  z-index: -1;
  opacity: 0.65;
  background-color: #000;
`;

export const SeriesScoreDynamicUndertone = styled.div`
  position: absolute;
  top: 95px;
  right: 1100px;
  width: 215px;
  height: 20px;
  z-index: -1;
  opacity: 1;
  max-width: 215px;
`;

export const OrangeSeriesScoreDynamicUndertone = styled.div`
  position: absolute;
  top: 95px;
  left: 1100px;
  width: 215px;
  height: 20px;
  z-index: -1;
  opacity: 1;
  max-width: 215px;
`;
