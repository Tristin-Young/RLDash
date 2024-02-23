import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f7f6; // Soft background color for a modern, minimalistic look
  height: 100vh;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px; // Ensuring the form is not too wide on larger screens
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Smoother shadow for depth
  border-radius: 12px; // Slightly increased border radius for a softer look
  background: #ffffff; // Solid background to stand out from the wrapper
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column; // Change to column for better mobile responsiveness
  align-items: flex-start; // Align items to the start for a cleaner layout
  width: 100%;
  margin-bottom: 20px;
`;

export const LogoFormGroup = styled(FormGroup)`
  flex-direction: row; // Keeping row direction for logo inputs
  justify-content: space-between;
  align-items: center;

  & > input {
    flex: 1; // Allow input to fill available space
  }
`;

export const RowInput = styled(FormGroup)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > label {
    flex-basis: 40%; // Adjust label width for consistency
  }
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 5px; // Add margin for spacing in column layout
`;

export const Input = styled.input`
  padding: 10px 15px;
  border-radius: 8px; // Increased border radius for a modern look
  border: 1px solid #ccc;
  background-color: #fff; // Ensure background is white for clarity
  font-size: 14px;
  color: #333;
  width: 90%; // Input takes full width for consistency
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); // Subtle inner shadow for depth

  &:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2); // Deeper shadow on focus for emphasis
  }
`;

export const Select = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  width: 60%; // Adjust width for better alignment
  cursor: pointer;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column; // Changed to column for better layout management
  align-items: flex-start; // Align items to start
  width: 100%;
`;

export const FileInputContainer2 = styled.div`
  display: flex;
  flex-direction: column; // Changed to column for better layout management
  align-items: flex-start; // Align items to start
  width: 100%;
`;

export const ImagePreview = styled.img`
  height: 50px;
  margin-top: 10px; // Added margin for spacing
`;

export const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%; // Button takes full width for a prominent call-to-action
  transition: background-color 0.3s ease, transform 0.2s ease; // Smoother transition for hover

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px); // Slight lift effect on hover for interactivity
  }
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