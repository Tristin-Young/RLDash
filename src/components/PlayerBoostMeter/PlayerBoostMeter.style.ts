import styled from "styled-components";

export const BoostMeterOuterCircle = styled.circle<{ $dashOffset: number }>`
stroke-dashoffset: ${(props) => props.$dashOffset};
`;

export const BoostMeterRing = styled.circle<{ $dashOffset: number }>`
  stroke-dashoffset: ${(props) => props.$dashOffset};
`;

export const BoostMeterInnerCircle = styled.circle`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoostMeterAmount = styled.text`

`;

export const BoostMeterSpeed = styled.text`

`;

export const BoostMeterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BoostMeterWrapper = styled.div`
  
  position: absolute;
  top: 778px;
  left: 1628px;
  height: 242px;
  width: 242px;
  margin: 0p auto;
  overflow: hidden;
  transform-origin: 0 0;

  svg > circle {
    transform: rotate(135deg);
    transform-origin: 50% 50%;
    z-index: 2;
  }

  img {
    position: absolute;
    width: 100%;  // Adjust the width as needed
    height: auto; // This will maintain the aspect ratio
    top: 0;
    left: 0;
    z-index: 1; // Ensure this is below the SVG but above the wrapper's background if any
  }
  
`;
