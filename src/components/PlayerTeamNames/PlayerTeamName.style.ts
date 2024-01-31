import exp from "constants";
import styled from "styled-components";

// create a wapper for the blue team's player names
// size is 320px wide by 160px tall
// positioned at X=0, Y=0
export const BlueTeamNamesWrapper = styled.div`
    background-color: lightblue;
    border-radius: 0 0 15px 0;
    color: black;
    position: absolute;
    height: 255px;
    width: 320px;
    text-align: center;
    font-family: 'Arial, Helvetica, sans-serif';
`;

// create a wapper for the blue team's player names
// size is 320px wide by 160px tall
// positioned at X=1600, Y=0
export const OrangeTeamNamesWrapper = styled.div`
    background-color: #FFD580;
    border-radius: 0 0 0 15px;
    color: black;
    position: absolute;
    height: 255px;
    width: 320px;
    right:0px;
    left: 1600px;
    text-align: center;
    font-family: 'Arial, Helvetica, sans-serif';
`;

// create a container for a single player's name
// size is 300px wide by 80px tall
export const PlayerNameAndBoostContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: space-between;
    justify-content: space-between;
    align-items: center;
    height: 25px;
    width: 265px;
    padding: 10px;
`;

export const PlayerContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    width: 265px;
    padding: 5px;
    padding-right: 15px;
    margin: 10px;
    border: 3px solid black;
    border-radius: 5px;
`;

export const OrangePlayerContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    width: 265px;
    padding: 5px;
    padding-left: 15px;
    margin: 10px;
    border: 3px solid black;
    border-radius: 5px;
`;

// create a styled p for the name
// font size is 40px
// font weight is bold
export const PlayerName = styled.p`
    font-size: 40px;
    font-weight: bold;
    margin: 0;
    margin-left: 5px;
    
`;

// create a styled p for the name
// font size is 40px
// font weight is bold
export const OrangePlayerName = styled.p`
    font-size: 40px;
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
    height: 10px;
    width: 265px;
    padding-left: 10px;
`;

export const OrangeBoostBarContainer = styled.div`
    position: relative;
    height: 10px;
    width: 265px;
    padding-right: 10px;
`;

// create a dynamic boost bar that changes width as
// the boost number changes
// size is 265px wide by 10px tall
// fills with blue as boost increases
export const BlueBoostBar = styled.div<{ boost: number }>`
    background-color: blue;
    position: absolute;
    height: 10px;
    width: ${props => props.boost * 2.65}px;
    border-radius: 5px;
    
`;

// create a dynamic boost bar that changes width as
// the boost number changes
// size is 265px wide by 10px tall
// fills with orange as boost increases
// fill is from right to left
export const OrangeBoostBar = styled.div<{ boost: number }>`
    background-color: orange;
    position: absolute;
    height: 10px;
    width: ${props => props.boost * 2.65}px;
    right: 5px;
    border-radius: 5px;
    
`;

// create background grey bar to show max boost
// size is 265px wide by 10px tall
export const GreyBoostBar = styled.div`
    background-color: grey;
    position: absolute;
    height: 10px;
    width: 265px;
    border-radius: 5px;
`;