// ControlPanel.tsx
import React, { useState, useContext, useEffect } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  SubmitButton,
  FormWrapper,
  RowInput,
  CheckboxContainer,
  FileInputContainer,
  ImagePreview,
  LogoFormGroup,
  FileInputContainer2,
} from "./ControlPanel.style";
import { ControlPanelContext } from "../../models/contexts/ControlPanelContext";
import { useWebSocketService } from "../../services/UseWebSocketService";

export const ControlPanel = () => {
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  // const { sendControlPanelUpdate } = useWebSocketService();
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {

    const webSocket = new WebSocket("ws://localhost:42000"); // Connect to your WebSocket server

    webSocket.onopen = () => {
      console.log("WebSocket connection established");
      
    };

    webSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(webSocket);

    return () => {
      if (webSocket.readyState === WebSocket.OPEN) webSocket.close();
    };
  }, []);

  const [blueTeamName, setBlueTeamName] = useState(
    controlPanelSettings.blueTeamName
  );
  const [orangeTeamName, setOrangeTeamName] = useState(
    controlPanelSettings.orangeTeamName
  );
  const [blueTeamColor, setBlueTeamColor] = useState(
    controlPanelSettings.blueTeamColor
  );
  const [orangeTeamColor, setOrangeTeamColor] = useState(
    controlPanelSettings.orangeTeamColor
  );
  const [blueWins, setBlueWins] = useState(controlPanelSettings.blueWins);
  const [orangeWins, setOrangeWins] = useState(controlPanelSettings.orangeWins);
  const [NumberOfGames, setNumberOfGames] = useState(
    controlPanelSettings.NumberOfGames
  );
  // const [showWinProb, setShowWinProb] = useState(
  //   controlPanelSettings.showWinProb
  // );
  // const [showSeriesScore, setShowSeriesScore] = useState(
  //   controlPanelSettings.showSeriesScore
  // );
  const [metricOrImperial, setMetricOrImperial] = useState(
    controlPanelSettings.metricOrImperial
  );
  const [savedata, setSaveData] = useState(controlPanelSettings.savedata);
  const [serverPortNumber, setServerPortNumber] = useState(
    controlPanelSettings.serverPortNumber
  );

  const [SeriesScoreWinPercent, setSeriesScoreWinPercent] = useState(controlPanelSettings.SeriesScoreWinPercent);
  const [showPlayerSpeed, setShowPlayerSpeed] = useState(controlPanelSettings.showPlayerSpeed);

  const [blueTeamLogo, setBlueTeamLogo] = useState("");
  const [orangeTeamLogo, setOrangeTeamLogo] = useState("");
  const [blueTeamLogoPreview, setBlueTeamLogoPreview] = useState("");
  const [orangeTeamLogoPreview, setOrangeTeamLogoPreview] = useState("");
  const [showFlipResets, setShowFlipResets] = useState(controlPanelSettings.showFlipResets);
  // Add a new state for feedback message
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleBlueTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlueTeamName(e.target.value);
  };

  const handleOrangeTeamNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrangeTeamName(e.target.value);
  };

  // UseEffect hooks for cleaning up image URL objects to avoid memory leaks
  useEffect(
    () => () => {
      URL.revokeObjectURL(blueTeamLogoPreview);
    },
    [blueTeamLogoPreview]
  );

  useEffect(
    () => () => {
      URL.revokeObjectURL(orangeTeamLogoPreview);
    },
    [orangeTeamLogoPreview]
  );

  const handleSeriesScoreWinPercentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSeriesScoreWinPercent(e.target.value);
  };
  
  const handleBlueTeamColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlueTeamColor(e.target.value);
  };

  const handleOrangeTeamColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrangeTeamColor(e.target.value);
  };

  const handleBlueWinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlueWins(Number(e.target.value));
  };

  const handleOrangeWinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrangeWins(Number(e.target.value));
  };

  const handleNumberOfGamesChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNumberOfGames(Number(e.target.value));
  };

  const handleShowPlayerSpeedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowPlayerSpeed(e.target.checked);
  };

  const handleShowWinProbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowWinProb(e.target.checked);
  };

  const handleShowSeriesScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowSeriesScore(e.target.checked);
  };

  const handleShowFlipResetsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowFlipResets(e.target.checked);
  };

  const handleMetricOrImperialChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMetricOrImperial(e.target.value);
  };

  const handleSaveDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveData(e.target.checked);
  };

  const handleServerPortNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setServerPortNumber(Number(e.target.value));
  };

  function convertToBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>, teamKey: string) {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      // Assuming setControlPanelSettings is a function that updates the local state
      // and `controlPanelSettings` is your current settings state
      setControlPanelSettings(prevSettings => ({
        ...prevSettings,
        [teamKey]: base64 // teamKey might be "BlueTeamPhoto" or "OrangeTeamPhoto"
      }));
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSettings = {
      ...controlPanelSettings,
      blueTeamName,
      orangeTeamName,
      blueTeamLogo,
      orangeTeamLogo,
      blueTeamLogoPreview,
      orangeTeamLogoPreview,
      blueWins,
      orangeWins,
      NumberOfGames,
      SeriesScoreWinPercent,
      // showWinProb,
      // showSeriesScore,
      showFlipResets,
      showPlayerSpeed,
      metricOrImperial,
      savedata,
      serverPortNumber,
    };
    setControlPanelSettings(newSettings);
    localStorage.setItem("controlPanelSettings", JSON.stringify(newSettings));
    console.log("newControlPanelSettings:", newSettings);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'updateSettings', data: newSettings }));
    }
    setFeedbackMessage("Settings updated successfully!");
    setTimeout(() => {
      setFeedbackMessage("");
    }, 3000);
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="blueName">Blue Team Name:</Label>
          <Input
            id="blueName"
            type="text"
            value={blueTeamName}
            onChange={handleBlueTeamNameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="orangeName">Orange Team Name:</Label>
          <Input
            id="orangeName"
            type="text"
            value={orangeTeamName}
            onChange={handleOrangeTeamNameChange}
          />
        </FormGroup>
        <LogoFormGroup>
          <Label htmlFor="blueTeamLogo">Blue Team Logo:</Label>
          <FileInputContainer>
            <Input
              id="blueTeamLogo"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "BlueTeamPhoto")}
            />
            {blueTeamLogo && (
              <ImagePreview
                src={blueTeamLogoPreview}
                alt="Blue Team Logo Preview"
              />
            )}
          </FileInputContainer>
        </LogoFormGroup>
        <LogoFormGroup>
          <Label htmlFor="orangeTeamLogo">Orange Team Logo:</Label>
          <FileInputContainer2>
            <Input
              id="orangeTeamLogo"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "OrangeTeamPhoto")}
            />
            {orangeTeamLogo && (
              <ImagePreview
                src={orangeTeamLogoPreview}
                alt="Orange Team Logo Preview"
              />
            )}
          </FileInputContainer2>
        </LogoFormGroup>
        {/* <FormGroup>
          <Label htmlFor="blueColor">Blue Team Color:</Label>
          <Input
            id="blueColor"
            type="text"
            value={blueTeamColor}
            onChange={handleBlueTeamColorChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="orangeColor">Orange Team Color:</Label>
          <Input
            id="orangeColor"
            type="text"
            value={orangeTeamColor}
            onChange={handleOrangeTeamColorChange}
          />
        </FormGroup> */}
        <FormGroup>
          <Label htmlFor="blueWinCount">Blue Win Count:</Label>
          <Input
            id="blueWinCount"
            type="number"
            value={blueWins}
            onChange={handleBlueWinsChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="orangeWinCount">Orange Win Count:</Label>
          <Input
            id="orangeWinCount"
            type="number"
            value={orangeWins}
            onChange={handleOrangeWinsChange}
          />
        </FormGroup>
        <RowInput>
          <Label htmlFor="numberOfGames">Number of Games:</Label>
          <Select
            id="numberOfGames"
            value={NumberOfGames}
            onChange={handleNumberOfGamesChange}
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="9">9</option>
            <option value="11">11</option>
          </Select>
        </RowInput>
        <RowInput>
          <Label htmlFor="metricOrImperial">MPH/KPH:</Label>
          <Select
            id="metricOrImperial"
            value={metricOrImperial}
            onChange={handleMetricOrImperialChange}
          >
            <option value="MPH">MPH</option>
            <option value="KPH">KPH</option>
          </Select>
        </RowInput>
        <RowInput>
          <Label htmlFor="SeriesScoreWinPercent">Series Score / Win Percent:</Label>
          <Select
            id="SeriesScoreWinPercent"
            value={SeriesScoreWinPercent}
            onChange={handleSeriesScoreWinPercentChange}
          >
            <option value="SeriesScore">Series Score</option>
            <option value="WinPercent">Win Percent</option>
            <option value="Both">Both</option>
            <option value="None">None</option>
          </Select>
        </RowInput>
        <RowInput>
          <Label htmlFor="showPlayerSpeed">Show Player Speed</Label>
          <CheckboxContainer>
            <Input
              id="showPlayerSpeed"
              type="checkbox"
              checked={showPlayerSpeed}
              onChange={handleShowPlayerSpeedChange}
            />
          </CheckboxContainer>
        </RowInput>
        {/* <RowInput>
          <Label htmlFor="showWinProb">Show Win Probability</Label>
          <CheckboxContainer>
            <Input
              id="showWinProb"
              type="checkbox"
              checked={showWinProb}
              onChange={handleShowWinProbChange}
            />
          </CheckboxContainer>
        </RowInput>
        <RowInput>
          <Label htmlFor="showSeriesScore">Show Series Score</Label>
          <CheckboxContainer>
            <Input
              id="showSeriesScore"
              type="checkbox"
              checked={showSeriesScore}
              onChange={handleShowSeriesScoreChange}
            />
          </CheckboxContainer>
        </RowInput> */}
        <RowInput>
          <Label htmlFor="showFlipResets">Show Flip Resets</Label>
          <CheckboxContainer>
            <Input
              id="showFlipResets"
              type="checkbox"
              checked={showFlipResets}
              onChange={handleShowFlipResetsChange}
            />
          </CheckboxContainer>
        </RowInput>
        {/* Save Data and Server Port Number inputs */}

        {/* <RowInput>
        <Label htmlFor="savedata">Save Data</Label>
          <CheckboxContainer>
            <Input
              id="savedata"
              type="checkbox"
              checked={savedata}
              onChange={handleSaveDataChange}
            />
          </CheckboxContainer>
        </RowInput>
        <FormGroup>
          <Label htmlFor="serverPortNumber">Server Port Number:</Label>
          <Input
            id="serverPortNumber"
            type="number"
            value={serverPortNumber}
            onChange={handleServerPortNumberChange}
          />
        </FormGroup> */}
        <SubmitButton type="submit">Update Settings</SubmitButton>
        {feedbackMessage && (
          <div style={{ marginTop: "20px", color: "green" }}>
            {feedbackMessage}
          </div>
        )}
      </Form>
    </FormWrapper>
  );
};
function setShowWinProb(checked: boolean) {
  throw new Error("Function not implemented.");
}

function setShowSeriesScore(checked: boolean) {
  throw new Error("Function not implemented.");
}

