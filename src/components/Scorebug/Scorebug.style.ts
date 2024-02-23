import styled from "styled-components";

// the entire scorebug is 1000px by 170px
// position is at X=460, Y=0
export const ScorebugWrapper = styled.div`
  height: 171px;
  width: 1048px;
  position: absolute;
  top: 0px;
  left: 436px;
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
  height: 92px;
  width: 92px;
  position: absolute;
  top: 33px;
  left: 21px;
  justify-content: center;
  > img {
    width: 100%;
  }
`;

// create a div for the blue teams name
// size it to 265px by 70px
// position is at X=545, Y=35
// relative to scorebugWraper, position is X=85, Y=35
//give background color of green at 30% opacity
export const ScorebugBlueName = styled.div`
  height: 95px;
  width: 190px;
  font-size: 60px;
  position: absolute;
  top: 36px;
  left: 132px;
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
  height: 95px;
  width: 78px;
  position: absolute;
  top: 32px;
  left: 337px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 100px;
  font-weight: bold;
`;

// create a div for the clock
// size it to 150px by 65px
// position is at X=885, Y=35
// relative to scorebugWraper, position is X=425, Y=35
export const ScorebugClock = styled.div`
  height: 95px;
  width: 170px;
  position: absolute;
  top: 32px;
  left: 439px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 75px;
`;

// create a div for the orange teams score
// size it to 75px by 65px
// position is at X=1035, Y=35
// relative to scorebugWraper, position is X=575, Y=35
export const ScorebugOrangeScore = styled.div`
  height: 95px;
  width: 78px;
  position: absolute;
  top: 32px;
  right: 337px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-weight: bold;
`;

// create a div for the orange teams name
// size it to 265px by 70px
// position is at X=1100, Y=35
// relative to scorebugWraper, position is X=640, Y=35
export const ScorebugOrangeName = styled.div`
  height: 95px;
  width: 190px;
  font-size: 60px;
  position: absolute;
  top: 36px;
  right: 132px;
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
  height: 92px;
  width: 92px;
  position: absolute;
  top: 33px;
  right: 21px;

  > img {
    width: 100%;
  }
`;

// create a div for the win percentage
// size it to 290px by 30px
//position is at X=460, Y=105
// relative to scorebugWraper, position is X=355, Y=100
// width is the width of the bluescore + the width of the clock + the width of the orangescore
export const ScorebugWinPercentage = styled.div`
  height: 44px;
  width: 211px;
  color: white;
  position: absolute;
  top: 127px;
  left: 419px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`;

export const ScorebugSeriesScore = styled.div`
  height: 44px;
  width: 211px;
  color: white;
  position: absolute;
  top: 127px;
  left: 419px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`;
export const ScorebugSeriesScoreAndWinPercentage = styled.div`
  height: 44px;
  width: 211px;
  color: white;
  position: absolute;
  top: 127px;
  left: 419px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 22px;
`;
// Styled wrapper for SVGs
export const ScorebugSvgWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 436px;
  width: 1048px; /* Ensure this matches the actual width of your PNG for proper alignment */
  height: 171px; /* Adjust if you know the exact height of your image or prefer a specific height */

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
top: 140px;
left: 525px;
width: 300px;
height: 20px;
z-index: -1;
opacity: 0.4;
`;

export const OrangeSeriesScoreUndertone = styled.div`
position: absolute;
top: 140px;
left: 1095px;
width: 300px;
height: 20px;
z-index: -1;
opacity: 0.4;
`;

export const SeriesScoreDynamicUndertone = styled.div`
position: absolute;
top: 140px;
right: 695px;
width: 300px;
height: 20px;
z-index: -1;
opacity: 1;
max-width: 300px;
`;

export const OrangeSeriesScoreDynamicUndertone = styled.div`
position: absolute;
top: 140px;
left: 1095px;
width: 300px;
height: 20px;
z-index: -1;
opacity: 1;
max-width: 300px;
`;