import styled from "styled-components";

// create stat bar that will sit on the overlay
// will sit at the bottom of the screen and lie horizontally
// size of bar is 1035px by 50px
// background color is black
// position is at X=0, Y=1030
export const StatBarWrapper = styled.div`
  background-color: black;
  position: absolute;
  height: 50px;
  width: 1250px;
  left: 0;
  bottom: 0;
  color: black;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-family: "Arial, Helvetica, sans-serif";
  border-radius: 0 10px 0 0;
  border-top: 2px solid black;
  border-right: 2px solid black;
`;


// create stat name
export const StatBarStatName = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: black;
  margin: 0;
`;

// create stat value
export const StatBarStatValue = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: black;
  margin: 0;
`;

// create stat name-value pair
export const StatBarStatPair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
  gap: 15px;
  font-family: "Arial, Helvetica, sans-serif";
  
`;

// class to modify the player name in bottom left corner
export const PlayerName = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: black;
  margin: 0;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Arial, Helvetica, sans-serif";
  
`;
export const Divider = styled.div`
  width: 2px;
  height: 35px;
  background-color: black;
  margin-left: 25px;
`;
