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
  ColorPickerInput,
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

  const [metricOrImperial, setMetricOrImperial] = useState(
    controlPanelSettings.metricOrImperial
  );
  const [savedata, setSaveData] = useState(controlPanelSettings.savedata);
  const [serverPortNumber, setServerPortNumber] = useState(
    controlPanelSettings.serverPortNumber
  );

  const [SeriesScoreWinPercent, setSeriesScoreWinPercent] = useState(
    controlPanelSettings.SeriesScoreWinPercent
  );
  const [showPlayerSpeed, setShowPlayerSpeed] = useState(
    controlPanelSettings.showPlayerSpeed
  );

  const [blueTeamLogo, setBlueTeamLogo] = useState("");
  const [orangeTeamLogo, setOrangeTeamLogo] = useState("");
  const [blueTeamLogoPreview, setBlueTeamLogoPreview] = useState("");
  const [orangeTeamLogoPreview, setOrangeTeamLogoPreview] = useState("");
  const [showFlipResets, setShowFlipResets] = useState(
    controlPanelSettings.showFlipResets
  );
  const [orangeTeamFlipColor, setOrangeTeamFlipColor] = useState(
    controlPanelSettings.orangeTeamFlipColor
  );
  const [blueTeamFlipColor, setBlueTeamFlipColor] = useState(
    controlPanelSettings.blueTeamFlipColor
  );
  const [flipUnavailableColor, setFlipUnavailableColor] = useState(
    controlPanelSettings.flipUnavailableColor
  );

  const [useTeamColorsForFlipColors, setUseTeamColorsForFlipColors] = useState(
    controlPanelSettings.useTeamColorsForFlipColors
  );

  const [showTeamWins, setShowTeamWins] = useState(
    controlPanelSettings.showTeamWins
  );
  // Add a new state for feedback message
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleShowTeamWinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowTeamWins(e.target.checked);
  };

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

  const handleUseTeamColorsForFlipColorsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUseTeamColorsForFlipColors(e.target.checked);
  };

  const handleBlueTeamColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBlueTeamColor(e.target.value);
  };

  const handleOrangeTeamColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrangeTeamColor(e.target.value);
  };

  const handleBlueTeamFlipColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBlueTeamFlipColor(e.target.value);
  };

  const handleOrangeTeamFlipColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrangeTeamFlipColor(e.target.value);
  };

  const handleFlipUnavailableColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFlipUnavailableColor(e.target.value);
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

  const handleShowFlipResetsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowFlipResets(e.target.checked);
  };

  const handleSeriesScoreWinPercentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSeriesScoreWinPercent(e.target.value);
  };

  const handleMetricOrImperialChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMetricOrImperial(e.target.value);
  };

  const handleSaveDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveData(e.target.checked);
  };

  function convertToBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    teamKey: string
  ) {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      // Assuming setControlPanelSettings is a function that updates the local state
      // and `controlPanelSettings` is your current settings state
      setControlPanelSettings((prevSettings) => ({
        ...prevSettings,
        [teamKey]: base64, // teamKey might be "BlueTeamPhoto" or "OrangeTeamPhoto"
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
      useTeamColorsForFlipColors,
      blueTeamColor,
      orangeTeamColor,
      blueTeamFlipColor,
      orangeTeamFlipColor,
      flipUnavailableColor,
      blueTeamLogoPreview,
      orangeTeamLogoPreview,
      blueWins,
      orangeWins,
      NumberOfGames,
      showTeamWins,
      SeriesScoreWinPercent,
      showFlipResets,
      showPlayerSpeed,
      metricOrImperial,
      savedata,
      serverPortNumber,
    };
    if (newSettings.useTeamColorsForFlipColors) {
      newSettings.blueTeamFlipColor = newSettings.blueTeamColor; // Use the team color for flip color
      newSettings.orangeTeamFlipColor = newSettings.orangeTeamColor; // Use the team color for flip color
    }
    setControlPanelSettings(newSettings);
    localStorage.setItem("controlPanelSettings", JSON.stringify(newSettings));
    console.log("newControlPanelSettings:", newSettings);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "updateSettings", data: newSettings }));
      console.log(newSettings);
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
        <RowInput>
          <Label htmlFor="useTeamColorsForFlip">Use Team Colors for Flip</Label>
          <CheckboxContainer>
            <Input
              id="useTeamColorsForFlip"
              type="checkbox"
              checked={useTeamColorsForFlipColors}
              onChange={handleUseTeamColorsForFlipColorsChange}
            />
          </CheckboxContainer>
        </RowInput>
        <FormGroup>
          <Label htmlFor="blueColor">Blue Team Color:</Label>
          <ColorPickerInput
            id="blueColor"
            type="color"
            value={controlPanelSettings.blueTeamColor}
            onChange={handleBlueTeamColorChange}
            style={{ backgroundColor: controlPanelSettings.blueTeamColor }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="orangeColor">Orange Team Color:</Label>
          <ColorPickerInput
            id="orangeColor"
            type="color"
            value={controlPanelSettings.orangeTeamColor}
            onChange={handleOrangeTeamColorChange}
            style={{ backgroundColor: controlPanelSettings.orangeTeamColor }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="blueFlipColor">Blue Team Flip Color:</Label>
          <ColorPickerInput
            id="blueFlipColor"
            type="color"
            value={controlPanelSettings.blueTeamFlipColor}
            onChange={handleBlueTeamFlipColorChange}
            style={{ backgroundColor: controlPanelSettings.blueTeamFlipColor }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="orangeFlipColor">Orange Team Flip Color:</Label>
          <ColorPickerInput
            id="orangeFlipColor"
            type="color"
            value={controlPanelSettings.orangeTeamFlipColor}
            onChange={handleOrangeTeamFlipColorChange}
            style={{
              backgroundColor: controlPanelSettings.orangeTeamFlipColor,
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="flipUnavailableColor">Flip Unavailable Color:</Label>
          <ColorPickerInput
            id="flipUnavailableColor"
            type="color"
            value={controlPanelSettings.flipUnavailableColor}
            onChange={handleFlipUnavailableColorChange}
            style={{
              backgroundColor: controlPanelSettings.flipUnavailableColor,
            }}
          />
        </FormGroup>
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
          </Select>
        </RowInput>
        <RowInput>
          <Label htmlFor="showTeamWins">Show Team Wins</Label>
          <CheckboxContainer>
            <Input
              id="showTeamWins"
              type="checkbox"
              checked={showTeamWins}
              onChange={handleShowTeamWinsChange}
            />
          </CheckboxContainer>
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
          <Label htmlFor="SeriesScoreWinPercent">
            Series Score / Win Percent:
          </Label>
          <Select
            id="SeriesScoreWinPercent"
            value={SeriesScoreWinPercent}
            onChange={handleSeriesScoreWinPercentChange}
          >
            <option value="SeriesScore">Series Score</option>
            <option value="WinPercent">Win Percent</option>
            {/* <option value="Both">Both</option> */}
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
        </RowInput> */}

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
