import styled from "styled-components";

// create a wapper for the blue team's player names
// size is 320px wide by 160px tall
// positioned at X=0, Y=0
export const BlueTeamNamesWrapper = styled.div`
  color: white;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 165px;
  width: 320px;
  text-align: center;
`;

// create a wapper for the blue team's player names
// size is 320px wide by 160px tall
// positioned at X=1600, Y=0
export const OrangeTeamNamesWrapper = styled.div`
  color: white;
  position: absolute;
  height: 165px;
  width: 320px;
  top: 0px;
  left: 1600px;
  text-align: center;
`;

// create a container for a single player's name
// size is 300px wide by 80px tall
export const PlayerNameAndBoostContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  width: 320px;
  margin-left: 15px;
`;

export const OrangePlayerNameAndBoostContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  width: 320px;
  margin-right: -70px;
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  width: 253px;
  margin-bottom: 1px;
  position: relative;
`;

export const CrossOutBlue = styled.div`
  position: absolute;
  top: 50%;
  left: 160px;
  width: 25%;
  height: 6px;
  background-color: red;
  transform: translateY(-50%) rotate(-45deg);
  z-index: 3;
`;
export const CrossOutBlue2 = styled.div`
  position: absolute;
  top: 50%;
  left: 160px;
  width: 25%;
  height: 6px;
  background-color: red;
  transform: translateY(-50%) rotate(45deg);
  z-index: 3;
`;

interface GreyOutBlueProps {
  index: number;
}
export const GreyOutBlue = styled.div.attrs<GreyOutBlueProps>((props) => ({
  style: {
    marginTop: `${[0, 10, 10][props.index % 3]}px`, // Use props.index here
  },
}))<GreyOutBlueProps>`
  osition: absolute;
  background-color: rgba(255, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  z-index: 2;
  border-radius: 12px;
`;

export const OrangePlayerContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  width: 253px;
  position: relative;
  right: 46px;
  margin-bottom: 1px;
`;

// create a styled p for the name
// font size is 40px
// font weight is bold
export const PlayerName = styled.p`
  font-size: 26px;
  margin: 0;
  margin-left: 28px;
  position: relative;
  top: 0px;
  overflow: hidden;
`;

export const PlayerBoost = styled.p`
  font-size: 26px;
  margin: 0;
  margin-right: -20px;
  position: relative;
  top: 0px;
`;

// create a styled p for the name
// font size is 40px
// font weight is bold
export const OrangePlayerName = styled.p`
  font-size: 26px;
  margin: 0;
  margin-right: 2px;
  position: relative;
  top: 0px;
  overflow: hidden;
`;

export const OrangePlayerBoost = styled.p`
  font-size: 26px;
  margin: 0;
  margin-left: 6px;
  position: relative;
  top: 0px;
`;

// create a styled p for the boost number
// font size is 40px
// font weight is bold
export const BoostNumber = styled.p`
  font-size: 26px;
  font-weight: bold;
  margin: 0;
`;

// create a container for the boost bar
// size is 265px wide by 10px tall
// should put all elements inside container on top of each other
export const BoostBarContainer = styled.div`
  position: relative;
  height: 7px;
  width: 320px;
  padding-left: 60px;
`;

export const OrangeBoostBarContainer = styled.div`
  position: relative;
  height: 7px;
  width: 320px;
  padding-right: 60px;
`;

interface BlueBoostBarProps {
  boost: number;
  index: number;
  color: string;
}

// create a dynamic boost bar that changes width as
// the boost number changes
// size is 265px wide by 10px tall
// fills with blue as boost increases
export const BlueBoostBar = styled.div.attrs<BlueBoostBarProps>((props) => ({
  style: {
    bottom: `${[7, 2, 2][props.index % 3]}px`, // Use props.index here
    width: `${props.boost * 3.22}px`, // Use props.boost here
    backgroundColor: props.color, // Use props.color here
  },
}))<BlueBoostBarProps>`
  // Apply the interface here as well
  // background-color: #00E8F4;
  position: absolute;
  height: 8px;
  border-bottom-right-radius: 10px;
  margin-left: 0px;
`;

interface OrangeBoostBarProps {
  boost: number;
  index: number;
  color: string;
}

export const OrangeBoostBar = styled.div.attrs<OrangeBoostBarProps>(
  (props) => ({
    style: {
      bottom: `${[7, 2, 2][props.index % 3]}px`, // Use props.index here
      width: `${props.boost * 3.21}px`, // Use props.boost here
      backgroundColor: props.color, // Use props.color here
    },
  })
)<OrangeBoostBarProps>`
  // Apply the interface here as well
  // background-color: #F59323;

  position: absolute;
  height: 8px;
  border-bottom-left-radius: 10px;
  right: -5px;
`;
// create background grey bar to show max boost
// size is 265px wide by 10px tall
export const GreyBoostBar = styled.div`
  background-color: grey;
  position: absolute;
  height: 7px;
  width: 214px;
  border-radius: 5px;
  margin-left: 7.5px;
  top: -13px;
`;

export const GreyBoostBarOrange = styled.div`
  background-color: grey;
  position: absolute;
  height: 7px;
  width: 214px;
  right: 18px;
  border-radius: 5px;
  top: -13px;
`;

// Styled wrapper for SVGs
export const BlueSvgWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 320px;
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const OrangeSvgWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0px; // Adjust these values as needed
  left: 1600px; // Adjust these values as needed
  width: 320px;
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const FlipIconSvgWrapper = styled.div`
  position: relative;
  z-index: 3;
  top: 0px; // Adjust these values as needed
  left: 75px; // Adjust these values as needed
  width: 45px;
  height: 25px; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const OrangeFlipIconSvgWrapper = styled.div`
  position: relative;
  z-index: 3;
  top: 0px; // Adjust these values as needed
  right: 54px; // Adjust these values as needed
  width: 45px;
  height: 25px; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;
export const PlayerAndFlipIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 320px;

  img {
    width: 45px;
    height: auto;
    position: relative;
    left: 5px;
  }
`;

export const OrangePlayerAndFlipIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; // Align items to the start of the container
  width: 260px;
  position: relative;
  right: 0px;

  img {
    width: 45px;
    height: auto;
    position: relative;
    right: 40px;
  }
`;
