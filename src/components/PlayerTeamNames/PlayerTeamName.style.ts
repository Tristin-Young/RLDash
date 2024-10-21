import styled from "styled-components";

export const BlueTeamNamesWrapper = styled.div`
  color: white;
  position: absolute;
  top: 196px;
  left: 37px;
  height: 223px;
  width: 256px;
  text-align: center;
`;

export const OrangeTeamNamesWrapper = styled.div`
  color: white;
  position: absolute;
  height: 223px;
  width: 256px;
  top: 196px;
  left: 1627px;
  text-align: center;
`;

// create a container for a single player's name
// size is 300px wide by 80px tall
export const PlayerNameAndBoostContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 256px;
`;

export const OrangePlayerNameAndBoostContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 256px;
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 256px;
  position: relative;
  margin-bottom: 4.25px;
`;

export const OrangePlayerContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 256px;
  position: relative;
  left: -46px;
  margin-bottom: 4.25px;
`;

// create a styled p for the name
// font size is 40px
// font weight is bold
export const PlayerName = styled.p`
  font-size: 36px;
  margin: 0;
  margin-left: 28px;
  position: relative;
  top: -2.5px;
  overflow: hidden;
`;

export const PlayerBoost = styled.p`
  font-size: 36px;
  margin: 0;
  margin-right: 20px;
  position: relative;
  top: -2.5px;
`;

// create a styled p for the name
// font size is 40px
// font weight is bold
export const OrangePlayerName = styled.p`
  font-size: 36px;
  margin: 0;
  margin-right: 28px;
  position: relative;
  top: -2.5px;
  overflow: hidden;
`;

export const OrangePlayerBoost = styled.p`
  font-size: 36px;
  margin: 0;
  margin-left: 20px;
  position: relative;
  top: -2.5px;
`;

// create a styled p for the boost number
// font size is 40px
// font weight is bold
export const BoostNumber = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin: 0;
`;

// create a container for the boost bar
// size is 265px wide by 10px tall
// should put all elements inside container on top of each other
export const BoostBarContainer = styled.div`
  position: relative;
  height: 7px;
  width: 230px;
  padding-left: 11px;
`;

export const OrangeBoostBarContainer = styled.div`
  position: relative;
  height: 7px;
  width: 230px;
  padding-right: 10px;
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
    bottom: `${[6, 6, 6.2][props.index % 3]}px`, // Use props.index here
    width: `${props.boost * 2.14}px`, // Use props.boost here
    backgroundColor: props.color, // Use props.color here
  },
}))<BlueBoostBarProps>`
  // Apply the interface here as well
  // background-color: #00E8F4;
  position: absolute;
  height: 11.5px;
  border-radius: 10px;
  margin-left: 7.5px;
`;

interface OrangeBoostBarProps {
  boost: number;
  index: number;
  color: string;
}

export const OrangeBoostBar = styled.div.attrs<OrangeBoostBarProps>(
  (props) => ({
    style: {
      bottom: `${[6, 6, 6.2][props.index % 3]}px`, // Use props.index here
      width: `${props.boost * 2.14}px`, // Use props.boost here
      backgroundColor: props.color, // Use props.color here
    },
  })
)<OrangeBoostBarProps>`
  // Apply the interface here as well
  // background-color: #F59323;

  position: absolute;
  height: 11.5px;
  border-radius: 10px;
  right: 16px;
`;
// create background grey bar to show max boost
// size is 265px wide by 10px tall
export const GreyBoostBar = styled.div`
  background-color: grey;
  position: absolute;
  height: 11px;
  width: 214px;
  border-radius: 5px;
  margin-left: 7.5px;
  top: -11px;
`;

export const GreyBoostBarOrange = styled.div`
  background-color: grey;
  position: absolute;
  height: 11px;
  width: 214px;
  right: 16px;
  border-radius: 5px;
  top: -11px;
`;

// Styled wrapper for SVGs
export const BlueSvgWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 196px;
  left: 37px;
  width: 256px;
  height: 223px; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const OrangeSvgWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 196px; // Adjust these values as needed
  left: 1627px; // Adjust these values as needed
  width: 256px;
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const FlipIconSvgWrapper = styled.div`
  position: relative;
  z-index: 3;
  top: 8px; // Adjust these values as needed
  left: 10px; // Adjust these values as needed
  width: 45px;
  height: 45px; /* Adjust if you know the exact height of your image or prefer a specific height */

  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const OrangeFlipIconSvgWrapper = styled.div`
  position: relative;
  z-index: 3;
  top: 8px; // Adjust these values as needed
  right: 54px; // Adjust these values as needed
  width: 45px;
  height: 45px; /* Adjust if you know the exact height of your image or prefer a specific height */

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
  //justify-content: space-between; // Align items to the start of the container
  width: 320px;
  position: relative;
  right: 2px;

  img {
    width: 45px;
    height: auto;
    position: relative;
    right: 40px;
  }
`;
