import styled from "styled-components";

// create stat bar that will sit on the overlay
// will sit at the bottom of the screen and lie horizontally
// size of bar is 1035px by 50px
// background color is black
// position is at X=0, Y=1030
export const StatBarWrapper = styled.div`
  position: absolute;
  height: 110px;
  width: 612px;
  left: 112px;
  top: 930px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: white;
  overflow: hidden;
  img {
    position: absolute;
    z-index: -1;
    height: auto;
    width: 612px;
  }
`;

// create stat name
export const StatBarStatName = styled.p`
  font-size: 18px;
  position: relative;
  margin: 0;
`;

// create stat value
export const StatBarStatValue = styled.p`
  font-size: 18px;

  margin: 0;
`;

// create stat name-value pair
export const StatBarStatPair = styled.div`
  // background-color: rgba(0, 99, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// class to modify the player name in bottom left corner
export const PlayerName = styled.p`
  font-size: 40px;
  height: 44px;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  left: 33px;
`;
// export const Divider = styled.div`
//   width: 2px;
//   height: 30px;
//   background-color: white;
//   //margin-left: 25px;
//   align-items: center;
// `;

export const StatsContainer = styled.div`
  width: 580px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 68px;
  left: 16px;
`;
