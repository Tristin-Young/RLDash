import styled from "styled-components";

// create stat bar that will sit on the overlay
// will sit at the bottom of the screen and lie horizontally
// size of bar is 1035px by 50px
// background color is black
// position is at X=0, Y=1030
export const StatBarWrapper = styled.div`
  position: absolute;
  width: 1920px;
  height: 99px;
  left: 0px;
  top: 981px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: white;
  // overflow: hidden;
  img {
    position: absolute;
    z-index: -1;
    height: auto;
    width: 1920px;
  }
`;

// create stat name
export const StatBarStatName = styled.p`
  font-size: 14px;
  padding-top: 6px;
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// class to modify the player name in bottom left corner
export const PlayerName = styled.p`
  font-size: 24px;
  width: 300px;
  height: 38px;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  position: absolute;
  top: 34px;
  left: 8px;
`;
// export const Divider = styled.div`
//   width: 2px;
//   height: 30px;
//   background-color: white;
//   //margin-left: 25px;
//   align-items: center;
// `;

export const ScorebugCreatorBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 1115px;
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 35px;
  left: 605px;
  color: white;
  padding-top: 3px;
`;

export const StatsContainer = styled.div`
  //background-color: rgba(255, 0, 0, 0.5);
  width: 605px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 74px;
  left: 0px;
`;
export const GreyBoostBar = styled.div`
  background-color: grey;
  position: absolute;
  height: 20px;
  width: 300px;
  border-radius: 0px;
  margin-left: 290px;
  top: -13px;
  z-index: -1;
`;
export const BoostBarContainer = styled.div`
  position: relative;
  height: 7px;
  width: 230px;
  padding-left: 10px;
`;

interface BlueBoostBarProps {
  boost: number;
  color: string;
}

export const BlueBoostBar = styled.div.attrs<BlueBoostBarProps>((props) => ({
  style: {
    bottom: `0px`, // Use props.index here
    width: `${props.boost * 2.9}px`, // Use props.boost here
    backgroundColor: props.color, // Use props.color here
  },
}))<BlueBoostBarProps>`
  // Apply the interface here as well
  // background-color: #00E8F4;
  position: absolute;
  height: 11px;
  border-radius: 10px;
  margin-left: 295px;
  top: -9px;
`;

export const PlayerBoostValue = styled.div`
  font-size: 16px;
  color: white;
  position: absolute;
  top: 52px;
  left: 572px;
`;

export const BottomPicture = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  height: 68px;
  width: 200px;
  top: 1012px;
  right: 0px;
  0 > img {
    height: 100%;
  }
`;
