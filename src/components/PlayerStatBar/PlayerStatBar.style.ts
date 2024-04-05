import styled from "styled-components";

// create stat bar that will sit on the overlay
// will sit at the bottom of the screen and lie horizontally
// size of bar is 1035px by 50px
// background color is black
// position is at X=0, Y=1030
export const StatBarWrapper = styled.div`
  position: absolute;
  height: 66px;
  width: 641px;
  left: 35px;
  top: 989px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: white;
  overflow: hidden;
  img {
    position: absolute;
    z-index: -1;
    height: auto;
    width: 641px;
  }
`;

// create stat name
export const StatBarStatName = styled.p`
  font-size: 20px;
  margin: 0;
`;

// create stat value
export const StatBarStatValue = styled.p`
  font-size: 20px;
  margin: 0;
`;

// create stat name-value pair
export const StatBarStatPair = styled.div`
  // background-color: rgba(0, 99, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// class to modify the player name in bottom left corner
export const PlayerName = styled.p`
  font-size: 40px;
  width: 234px;
  height: 64px;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 2px;
`;
// export const Divider = styled.div`
//   width: 2px;
//   height: 30px;
//   background-color: white;
//   //margin-left: 25px;
//   align-items: center;
// `;

export const StatsContainer = styled.div`
  //background-color: rgba(255, 255, 0, 0.5);
  width: 407px;
  height: 59px;
  margin-left: 234px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: -1px;
`;
