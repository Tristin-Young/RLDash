import styled from "styled-components";

// the entire scorebug is 1000px by 170px
// position is at X=460, Y=0
export const ScorebugWrapper = styled.div`
  height: auto;
  width: 1044px;
  position: absolute;
  top: 0px;
  left: 438px;
`;

// create a div for the creator banner
// size it to 850px by 35px
// position is at X=535, Y=0
// relative to scorebugWraper, position is X=75, Y=0
export const ScorebugCreatorBanner = styled.div`
  height: 19px;
  width: 775px;
  font-size: 14px;
  text-align: center;
  position: absolute;
  top: 0px;
  left: 135px;
  color: white;
  padding-top: 3px;
`;

// create a div for the blue teams logo
// size it to 85 by 70 px
// position is at X=460, Y=35
// relative to scorebugWraper, position is X=0, Y=35
export const ScorebugBlueLogo = styled.div`
  display: flex;
  height: 68px;
  width: 63px;
  position: absolute;
  top: 21px;
  left: 9px;
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
  height: 68px;
  width: 307px;
  font-size: 26px;
  position: absolute;
  top: 24px;
  left: 72px;
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
  height: 68px;
  width: 66px;
  position: absolute;
  top: 25px;
  left: 379px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 40px;
`;

// create a div for the clock
// size it to 150px by 65px
// position is at X=885, Y=35
// relative to scorebugWraper, position is X=425, Y=35
export const ScorebugClock = styled.div`
  height: 68px;
  width: 154px;
  position: absolute;
  top: 25px;
  left: 445px;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 36px;
`;

// create a div for the orange teams score
// size it to 75px by 65px
// position is at X=1035, Y=35
// relative to scorebugWraper, position is X=575, Y=35
export const ScorebugOrangeScore = styled.div`
  height: 68px;
  width: 66px;
  position: absolute;
  top: 25px;
  right: 379px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

// create a div for the orange teams name
// size it to 265px by 70px
// position is at X=1100, Y=35
// relative to scorebugWraper, position is X=640, Y=35
export const ScorebugOrangeName = styled.div`
  height: 68px;
  width: 309px;
  font-size: 26px;
  position: absolute;
  top: 24px;
  right: 70px;
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
  position: absolute;
  justify-content: center;
  height: 68px;
  width: 63px;
  top: 21px;
  right: 9px;

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
  height: 30px;
  width: 154px;
  color: white;
  position: absolute;
  top: 89px;
  left: 445px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export const ScorebugSeriesScore = styled.div`
  height: 30px;
  width: 154px;
  color: white;
  position: absolute;
  top: 89px;
  left: 445px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;
export const ScorebugSeriesScoreAndWinPercentage = styled.div`
  height: 30px;
  width: 154px;
  color: white;
  position: absolute;
  top: 89px;
  left: 445px;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  div {
    position: relative;
    top: -2px;
    padding-bottom: 0px;
  }
`;
// Styled wrapper for SVGs
export const ScorebugSvgWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 438px;
  width: 1044px; /* Ensure this matches the actual width of your PNG for proper alignment */
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

export const EventLogoSVGwrapper = styled.div`
  position: absolute;
  z-index: -2;
  //top: 1015px;
  top: 3px;
  left: 915px;
  width: 90px; /* Ensure this matches the actual width of your PNG for proper alignment */
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const SponsorLogo1SVGwrapper = styled.div`
  position: absolute;
  z-index: 2;
  //top: 1015px;
  top: 17px;
  left: 596px;
  width: 50px; /* Ensure this matches the actual width of your PNG for proper alignment */
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const SponsorLogo2SVGwrapper = styled.div`
  position: absolute;
  z-index: 2;
  //top: 1015px;
  top: -7px;
  left: 933px;
  width: 55px; /* Ensure this matches the actual width of your PNG for proper alignment */
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

export const DarkSeriesScoreUndertone1 = styled.div`
  position: absolute;
  top: 90px;
  right: 1040px;
  width: 225px;
  height: 20px;
  z-index: -1;
  opacity: 1;
  max-width: 225px;
`;

export const DarkSeriesScoreUndertone2 = styled.div`
  position: absolute;
  top: 90px;
  left: 1040px;
  width: 225px;
  height: 20px;
  z-index: -1;
  opacity: 1;
  max-width: 225px;
`;

export const SeriesScoreDynamicUndertone = styled.div`
  position: absolute;
  top: 90px;
  right: 1040px;
  width: 225px;
  height: 20px;
  z-index: -1;
  opacity: 1;
  max-width: 225px;
`;

export const OrangeSeriesScoreDynamicUndertone = styled.div`
  position: absolute;
  top: 90px;
  left: 1040px;
  width: 225px;
  height: 20px;
  z-index: -1;
  opacity: 1;
  max-width: 225px;
`;
