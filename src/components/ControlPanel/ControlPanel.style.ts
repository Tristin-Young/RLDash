import styled from "styled-components";

export const FormWrapper = styled.div`
  background-color: #f4f7f6;
  height: 100vh; /* Full height of the viewport */
  width: 100vw; /* Full width of the viewport */
  padding: 25px;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent any unnecessary scrolling */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box; /* Ensures padding is included in width/height calculations */
  background: #ffffff;
  overflow-y: auto; /* Allows vertical scrolling if the form content exceeds viewport height */
  overflow-x: hidden; /* Prevent horizontal scrolling */
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

export const TwoColumnRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  & > div {
    width: 48%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
`;

export const ThreeColumnRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  & > div {
    width: 30%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Input = styled.input`
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const Select = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  width: 100%;
  cursor: pointer;
`;

export const ColorPickerInput = styled(Input)`
  cursor: pointer;
  -webkit-appearance: none;
  margin: 0;
  width: auto;
  height: auto;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 8px;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 22px 0;
`;

export const CheckboxContainer2 = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 0 0;
`;
export const DynamicCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 10px;
  appearance: none;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  display: inline-block;
  position: relative;

  &:checked {
    background-color: #4caf50;
    border-color: #4caf50;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    background-color: #ffffff;
    clip-path: polygon(14% 44%, 0% 65%, 50% 100%, 100% 16%, 85% 0%, 43% 77%);
  }

  &:hover {
    border-color: #4caf50;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.5);
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const GreyOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const LockedMessage = styled.div`
  position: fixed; /* Make sure it's fixed, so it stays in the center */
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    -50%
  ); /* Center it both horizontally and vertically */
  font-size: 48px;
  font-weight: bold; /* Corrected font weight */
  color: #fff;
  z-index: 1001;
  text-align: center;
`;
