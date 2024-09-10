import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* Prevent horizontal scrolling on the whole page */
    overflow-y: hidden; /* Prevent vertical scrolling on the whole page */
    width: 100vw; /* Ensure the viewport width is restricted */
    height: 100%; /* Ensure the viewport height is restricted */
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit; /* Inherit box-sizing to all elements */
  }
`;
