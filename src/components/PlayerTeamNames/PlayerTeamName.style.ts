import styled from "styled-components";

// create a wapper for the blue team's player names
// size is 320px wide by 160px tall
// positioned at X=0, Y=0
export const BlueTeamNamesWrapper = styled.div`
  color: white;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 255px;
  width: 320px;
  text-align: center;
  font-family: "Arial, Helvetica, sans-serif";
`;

// create a wapper for the blue team's player names
// size is 320px wide by 160px tall
// positioned at X=1600, Y=0
export const OrangeTeamNamesWrapper = styled.div`
  color: white;
  position: absolute;
  height: 255px;
  width: 320px;
  top: 0px;
  left: 1600px;
  text-align: center;
  font-family: "Arial, Helvetica, sans-serif";
`;

// create a container for a single player's name
// size is 300px wide by 80px tall
export const PlayerNameAndBoostContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 25px;
  width: 230px;
  padding-top: 20px;
`;

export const OrangePlayerNameAndBoostContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 25px;
  width: 230px;
  padding-top: 20px;
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  width: 230px;
  padding-left: 15px;
`;

export const OrangePlayerContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  width: 230px;
  padding-left: 70px;
  position: relative;
  right: 45px;
`;

// create a styled p for the name
// font size is 40px
// font weight is bold
export const PlayerName = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin: 0;
  margin-left: 5px;
`;

// create a styled p for the name
// font size is 40px
// font weight is bold
export const OrangePlayerName = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin: 0;
  margin-right: 5px;
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
  padding-left: 10px;
`;

export const OrangeBoostBarContainer = styled.div`
  position: relative;
  height: 7px;
  width: 230px;
  padding-right: 10px;
`;

// create a dynamic boost bar that changes width as
// the boost number changes
// size is 265px wide by 10px tall
// fills with blue as boost increases
export const BlueBoostBar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'boost',
})<{ boost: number }>` // Add type declaration for 'props' parameter
  background-color: #00E8F4;
  position: absolute;
  height: 7px;
  width: ${(props) => props.boost * 2.3}px;
  border-radius: 5px;
`;

// create a dynamic boost bar that changes width as
// the boost number changes
// size is 265px wide by 10px tall
// fills with orange as boost increases
// fill is from right to left
export const OrangeBoostBar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'boost',
})<{ boost: number }>` // Add type declaration for 'props' parameter
  background-color: #F59323;
  position: absolute;
  height: 7px;
  width: ${(props) => props.boost * 2.3}px;
  right: 5px;
  border-radius: 5px;
`;

// create background grey bar to show max boost
// size is 265px wide by 10px tall
export const GreyBoostBar = styled.div`
  background-color: grey;
  position: absolute;
  height: 7px;
  width: 230px;
  border-radius: 5px;
`;

export const GreyBoostBarOrange = styled.div`
  background-color: grey;
  position: absolute;
  height: 7px;
  width: 230px;
  right: 5px;
  border-radius: 5px;
`;

// Styled wrapper for SVGs
export const BlueSvgWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 380px;
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
  left: 1540px; // Adjust these values as needed
  width: 380px;
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */
  
  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const FlipIconSvgWrapper = styled.div`
  position: relative;
  z-index: 3;
  //top: 0px; // Adjust these values as needed
  //left: 1540px; // Adjust these values as needed
  width: 50px;
  height: auto; /* Adjust if you know the exact height of your image or prefer a specific height */
  
  img {
    width: 100%; /* This will make the image fill the div's width */
    height: auto; /* Adjust the height automatically to maintain aspect ratio */
  }
`;

export const PlayerAndFlipIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; // Align items to the start of the container
  width: 100%;

  img {
    width: 45px;
    height: auto;
    position: relative;
    top: 18px;
    right: 15px;
  }
`;

export const OrangePlayerAndFlipIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; // Align items to the start of the container
  width: 100%;

  img {
    width: 45px;
    height: auto;
    position: relative;
    top: 18px;
    left: 15px;
  }
`;