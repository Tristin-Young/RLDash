import styled from "styled-components";

// the entire scorebug is 1000px by 170px
// position is at X=460, Y=0
export const ScorebugWrapper = styled.div`
  height: 250px;
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
height: 75px;
width: 75px;
position: absolute;
top: 51px;
left: 44px;
justify-content: center;
> img {
  width: 100%;
 padding-left: 18px; 
}
`;

// create a div for the blue teams name
// size it to 265px by 70px
// position is at X=545, Y=35
// relative to scorebugWraper, position is X=85, Y=35
//give background color of green at 30% opacity
export const ScorebugBlueName = styled.div`
  
  height: 56px;
  width: 225px;
  font-weight: bold;
  font-size: 40px;
  position: absolute;
  top: 56px;
  left: 135px;
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

  height: 56px;
  width: 70px;
  position: absolute;
  top: 56px;
  left: 360px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
`;

// create a div for the clock
// size it to 150px by 65px
// position is at X=885, Y=35
// relative to scorebugWraper, position is X=425, Y=35
export const ScorebugClock = styled.div`

  height: 70px;
  width: 130px;
  color: white;
  position: absolute;
  top: 46px;
  left: 435px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
`;

// create a div for the orange teams score
// size it to 75px by 65px
// position is at X=1035, Y=35
// relative to scorebugWraper, position is X=575, Y=35
export const ScorebugOrangeScore = styled.div`

  height: 56px;
  width: 70px;
  position: absolute;
  top: 56px;
  right: 360px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
`;

// create a div for the orange teams name
// size it to 265px by 70px
// position is at X=1100, Y=35
// relative to scorebugWraper, position is X=640, Y=35
export const ScorebugOrangeName = styled.div`
  height: 56px;
  width: 225px;
  font-weight: bold;
  font-size: 40px;
  position: absolute;
  top: 56px;
  right: 135px;
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
height: 75px;
width: 75px;
position: absolute;
top: 51px;
right: 44px;

> img {
  width: 100%;
 padding-right: 18px; 
}
`;

// create a div for the win percentage
// size it to 290px by 30px
//position is at X=460, Y=105
// relative to scorebugWraper, position is X=355, Y=100
// width is the width of the bluescore + the width of the clock + the width of the orangescore
export const ScorebugWinPercentage = styled.div`
  height: 30px;
  width: 210px;
  color: black;
  position: absolute;
  top: 163px;
  left: 395px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  

`;

export const ScorebugSeriesScore = styled.div`
  height: 30px;
  width: 210px;
  color: black;
  position: absolute;
  top: 125px;
  left: 395px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  

`;

// Styled wrapper for SVGs
export const ScorebugSvgWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 460px;
  width: 1000px; /* Ensure this matches the actual width of your PNG for proper alignment */
  height: 275px; /* Adjust if you know the exact height of your image or prefer a specific height */
  
  img {
    width: 100%; /* This will make the image fill the div's width */
    height: 250px; /* Adjust the height automatically to maintain aspect ratio */
  }
`;
export const OrangeUndertone = styled.div`
  position: absolute;
  top: 125px;
  left: 1100px;
  width: 175px;
  height: 20px;
  background-color: #443630;
  opacity: 1;
  z-index: -1;
`;

export const BlueUndertone = styled.div`
  position: absolute;
  top: 125px;
  left: 645px;
  width: 175px;
  height: 20px;
  background-color: #2d373f;
  opacity: 1;
  z-index: -1;
`;
