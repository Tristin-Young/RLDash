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
  font-family: "Arial, Helvetica, sans-serif";
  font-size: 80px;
  font-weight: bold;
  // text-shadow: 1px 1px 5px black;

`;

export const BoostMeterSpeed = styled.text`
  font-family: "Arial, Helvetica, sans-serif";
  font-size: 32px;
  font-weight: bold;
  // text-shadow: 1px 1px 5px black;
`;

export const BoostMeterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BoostMeterWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  height: 250px;
  width: 250px;
  margin: 0p auto;
  overflow: hidden;
  transform-origin: 0 0;

  svg > circle {
    transform: rotate(135deg);
    transform-origin: 50% 50%;
  }
`;
