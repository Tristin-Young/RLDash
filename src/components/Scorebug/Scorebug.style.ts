import styled from "styled-components";

// the entire scorebug is 1000px by 170px
// position is at X=460, Y=0
export const ScorebugWrapper = styled.div`
  height: 250px;
  width: 1000px;
  color: white;
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
  background-color: lightgrey;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  position: absolute;
  top: 0px;
  left: 86px;
  color: black;
  border-left: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
`;

// create a div for the blue teams logo
// size it to 85 by 70 px
// position is at X=460, Y=35
// relative to scorebugWraper, position is X=0, Y=35
export const ScorebugBlueLogo = styled.div`
  height: 70px;
  width: 85px;
  background-color: black;
  position: absolute;
  top: 35px;
  left: 0px;
`;

// create a div for the blue teams name
// size it to 265px by 70px
// position is at X=545, Y=35
// relative to scorebugWraper, position is X=85, Y=35
export const ScorebugBlueName = styled.div`
  height: 70px;
  width: 275px;
  background-color: lightblue;
  font-weight: bold;
  font-size: 40px;
  position: absolute;
  top: 35px;
  left: 85px;
  color: black;
  border-radius:0 0 15px 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid black;
  border-left: 3px solid black;
`;

// create a div for the blue teams score
// size it to 75px by 65px
// position is at X=810, Y=35
// relative to scorebugWraper, position is X=350, Y=35
export const ScorebugBlueScore = styled.div`
  height: 65px;
  width: 70px;
  background-color: lightblue;
  position: absolute;
  top: 35px;
  left: 355px;
  color: black;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
  border-bottom: 3px solid black;
  border-left: 3px solid black;
`;

// create a div for the clock
// size it to 150px by 65px
// position is at X=885, Y=35
// relative to scorebugWraper, position is X=425, Y=35
export const ScorebugClock = styled.div`
  height: 65px;
  width: 150px;
  background-color: lightgrey;
  color: white;
  position: absolute;
  top: 35px;
  left: 425px;
  color: black;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
  border-bottom: 3px solid black;
  border-left: 3px solid black;
  border-right: 3px solid black;
`;

// create a div for the orange teams score
// size it to 75px by 65px
// position is at X=1035, Y=35
// relative to scorebugWraper, position is X=575, Y=35
export const ScorebugOrangeScore = styled.div`
  height: 65px;
  width: 70px;
  background-color: #FFD580;
  color: white;
  position: absolute;
  top: 35px;
  left: 575px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
  border-bottom: 3px solid black;
  border-right: 3px solid black;
`;

// create a div for the orange teams name
// size it to 265px by 70px
// position is at X=1100, Y=35
// relative to scorebugWraper, position is X=640, Y=35
export const ScorebugOrangeName = styled.div`
  height: 70px;
  width: 275px;
  background-color: #FFD580;
  font-weight: bold;
  font-size: 40px;
  position: absolute;
  top: 35px;
  left: 640px;
  color: black;
  border-radius:0 0 0 15px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid black;
  border-right: 3px solid black;
`;

// create a div for the blue teams logo
// size it to 85 by 70 px
// position is at X=1375, Y=35
// relative to scorebugWraper, position is X=915, Y=35
export const ScorebugOrangeLogo = styled.div`
  height: 70px;
  width: 85px;
  background-color: black;
  position: absolute;
  top: 35px;
  left: 915px;
`;

// create a div for the win percentage
// size it to 290px by 30px
//position is at X=460, Y=105
// relative to scorebugWraper, position is X=355, Y=100
// width is the width of the bluescore + the width of the clock + the width of the orangescore
export const ScorebugWinPercentage = styled.div`
  height: 30px;
  width: 290px;
  background-color: lightgrey;
  color: black;
  position: absolute;
  top: 100px;
  left: 355px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border-left: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
`;