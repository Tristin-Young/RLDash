import styled from "styled-components";

// create stat bar that will sit on the overlay
// will sit at the bottom of the screen and lie horizontally
// size of bar is 1035px by 50px
// background color is black
// position is at X=0, Y=1030
export const StatBarWrapper = styled.div`
 //red bg at 50% opacity 
  // background-color: rgba(99, 0, 0, 0.5);
  position: absolute;
  height: 50px;
  width: 1195px;
  left: 0;
  top:1030px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-family: "Arial, Helvetica, sans-serif";
  color: white;

  img {
    
    position: absolute;
    z-index: -1;
    height: auto;
    width: 1250px;
    bottom: 0px;
  }
`;


// create stat name
export const StatBarStatName = styled.p`

  font-size: 26px;
  font-weight: bold;
  margin: 0;
`;

// create stat value
export const StatBarStatValue = styled.p`

  font-size: 26px;
  font-weight: bold;
  margin: 0;
`;

// create stat name-value pair
export const StatBarStatPair = styled.div`
// background-color: rgba(0, 99, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: "Arial, Helvetica, sans-serif";
  
`;

// class to modify the player name in bottom left corner
export const PlayerName = styled.p`
  font-size: 34px;
  font-weight: bold;
  margin: 0;
  margin-left: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Arial, Helvetica, sans-serif";
  
`;
export const Divider = styled.div`
  width: 2px;
  height: 30px;
  background-color: white;
  //margin-left: 25px;
  align-items: center;
`;

export const StatsContainer = styled.div`
// background-color: rgba(0, 0, 99, 0.5);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 25px; /* Adjust gap as needed */
  margin-left: auto; /* Pushes the stats container to the right */
  position: relative;
  top: -3px;
  
`;