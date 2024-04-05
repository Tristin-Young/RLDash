import styled from "styled-components";

// the entire scorebug is 1000px by 170px
// position is at X=460, Y=0
export const ScorebugWrapper = styled.div`
  height: auto;
  width: 1028px;
  position: absolute;
  top: 0px;
  left: 446px;
`;

// create a div for the creator banner
// size it to 850px by 35px
// position is at X=535, Y=0
// relative to scorebugWraper, position is X=75, Y=0
export const ScorebugCreatorBanner = styled.div`
  display: flex;
  height: 32px;
  width: 820px;
  font-size: 18px;
  text-align: center;
  position: absolute;
  top: 0px;
  left: 552px;
  color: white;
  justify-content: space-around;
  align-items: center;
`;

// create a div for the blue teams logo
// size it to 85 by 70 px
// position is at X=460, Y=35
// relative to scorebugWraper, position is X=0, Y=35
export const ScorebugBlueLogo = styled.div`
  display: flex;
  height: 79px;
  width: 79px;
  position: absolute;
  top: 31px;
  left: 12px;
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
  height: 63px;
  width: 258px;
  font-size: 44px;
  position: absolute;
  top: 38px;
  left: 98px;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;

// create a div for the blue teams score
// size it to 75px by 65px
// position is at X=810, Y=35
// relative to scorebugWraper, position is X=350, Y=35
export const ScorebugBlueScore = styled.div`
  height: 69px;
  width: 80px;
  position: absolute;
  top: 32px;
  left: 356px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 48px;
  padding-top: 8px;
`;

// create a div for the clock
// size it to 150px by 65px
// position is at X=885, Y=35
// relative to scorebugWraper, position is X=425, Y=35
export const ScorebugClock = styled.div`
  height: 69px;
  width: 158px;
  position: absolute;
  top: 32px;
  left: 436px;
  color: black;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 38px;
  padding-top: 5px;
`;

// create a div for the orange teams score
// size it to 75px by 65px
// position is at X=1035, Y=35
// relative to scorebugWraper, position is X=575, Y=35
export const ScorebugOrangeScore = styled.div`
  height: 69px;
  width: 80px;
  position: absolute;
  top: 32px;
  right: 354px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  padding-top: 8px;
`;

// create a div for the orange teams name
// size it to 265px by 70px
// position is at X=1100, Y=35
// relative to scorebugWraper, position is X=640, Y=35
export const ScorebugOrangeName = styled.div`
  height: 63px;
  width: 258px;
  font-size: 44px;
  position: absolute;
  top: 38px;
  right: 96px;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-top: 6px;
`;

// create a div for the blue teams logo
// size it to 85 by 70 px
// position is at X=1375, Y=35
// relative to scorebugWraper, position is X=915, Y=35
export const ScorebugOrangeLogo = styled.div`
  display: flex;
  justify-content: center;
  height: 79px;
  width: 79px;
  position: absolute;
  top: 31px;
  right: 12px;

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
  //background-color: rgba(0, 0, 0, 0.5);
  height: 28px;
  width: 262px;
  position: absolute;
  top: 101px;
  left: 368px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  div {
    position: relative;
    top: 2px;
  }
`;

export const ScorebugSeriesScore = styled.div`
  height: 28px;
  width: 252px;
  color: black;
  position: absolute;
  top: 101px;
  left: 380px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  padding-top: 4px;
`;
export const ScorebugSeriesScoreAndWinPercentage = styled.div`
  height: 52px;
  width: 209px;
  position: absolute;
  top: 99px;
  left: 396px;
  color: black;
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
  left: 446px;
  width: 1028px; /* Ensure this matches the actual width of your PNG for proper alignment */
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
  top: 1030px;
  left: 1800px;
  width: 120px; /* Ensure this matches the actual width of your PNG for proper alignment */
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const SeriesScoreUndertone = styled.div`
  position: absolute;
  top: 95px;
  left: 550px;
  width: 250px;
  height: 20px;
  z-index: -1;
  opacity: 0.8;
`;

export const OrangeSeriesScoreUndertone = styled.div`
  position: absolute;
  top: 95px;
  left: 1120px;
  width: 250px;
  height: 20px;
  z-index: -1;
  opacity: 0.8;
`;

export const DarkSeriesScoreUndertone = styled.div`
  position: absolute;
  top: 95px;
  left: 550px;
  width: 820px;
  height: 20px;
  z-index: -1;
  opacity: 0.65;
  background-color: #000;
`;

export const SeriesScoreDynamicUndertone = styled.div`
  position: absolute;
  top: 95px;
  right: 1150px;
  width: 190px;
  height: 20px;
  z-index: -1;
  opacity: 1;
  max-width: 190px;
`;

export const OrangeSeriesScoreDynamicUndertone = styled.div`
  position: absolute;
  top: 95px;
  left: 1150px;
  width: 190px;
  height: 20px;
  z-index: -1;
  opacity: 1;
  max-width: 190px;
`;
