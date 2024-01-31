import styled from "styled-components";

export const StatCardWrapper = styled.div`
    background-color: green;
    color: black;
    position: absolute;
    height: 400px;
    width: 600px;
    text-align: center;
    font-family: 'Arial, Helvetica, sans-serif';
`;

export const StatCardContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 600px;
    padding: 10px;
`;

export const StatCardStatName = styled.p`
    font-size: 20px;
    font-weight: bold;
    margin: 0;
`;

export const StatCardStatValue = styled.p`
font-size: 20px;
font-weight: bold;
margin: 0;
`;
