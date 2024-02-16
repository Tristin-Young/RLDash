import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f7f6;
  height: 100vh;
  width: 100%; // Adjusted to fill the screen width
`;
    
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  min-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 20px;
`;

export const LogoFormGroup = styled(FormGroup)`

    & > Input {
        height: 150px;
        width: 100%;
    }
    `;

export const RowInput = styled(FormGroup)`
  & > label {
    flex-basis: auto;
  }
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #333;
  width: 70%;
  

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }

  
`;

export const Select = styled.select`
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  width: 50%;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 297px;
`;

export const FileInputContainer2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 280px;
`;

export const ImagePreview = styled.img`
  height: 50px; // Adjust size as needed
  margin-left: 10px;
`;

export const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 80%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;
