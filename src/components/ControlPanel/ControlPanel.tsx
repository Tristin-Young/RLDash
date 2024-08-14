import React, { useContext, useState, useEffect } from "react";
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

export const ControlPanel = () => {
  const {
    controlPanelSettings,
    setControlPanelSettings,
    subscribe,
    updateSettings,
  } = useContext(ControlPanelSettingsContext);

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
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    setBlueTeamName(controlPanelSettings.blueTeamName);
    setOrangeTeamName(controlPanelSettings.orangeTeamName);
    setBlueTeamColor(controlPanelSettings.blueTeamColor);
    setOrangeTeamColor(controlPanelSettings.orangeTeamColor);
    setBlueWins(controlPanelSettings.blueWins);
    setOrangeWins(controlPanelSettings.orangeWins);
    setNumberOfGames(controlPanelSettings.NumberOfGames);
    setMetricOrImperial(controlPanelSettings.metricOrImperial);
    setSaveData(controlPanelSettings.savedata);
    setServerPortNumber(controlPanelSettings.serverPortNumber);
    setSeriesScoreWinPercent(controlPanelSettings.SeriesScoreWinPercent);
    setShowPlayerSpeed(controlPanelSettings.showPlayerSpeed);
    setShowFlipResets(controlPanelSettings.showFlipResets);
    setOrangeTeamFlipColor(controlPanelSettings.orangeTeamFlipColor);
    setBlueTeamFlipColor(controlPanelSettings.blueTeamFlipColor);
    setFlipUnavailableColor(controlPanelSettings.flipUnavailableColor);
    setUseTeamColorsForFlipColors(
      controlPanelSettings.useTeamColorsForFlipColors
    );
    setShowTeamWins(controlPanelSettings.showTeamWins);
    setBlueTeamLogo(controlPanelSettings.BlueTeamPhoto);
    setOrangeTeamLogo(controlPanelSettings.OrangeTeamPhoto);
    setBlueTeamLogoPreview(controlPanelSettings.BlueTeamPhoto);
    setOrangeTeamLogoPreview(controlPanelSettings.OrangeTeamPhoto);
  }, [controlPanelSettings]);

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
    let winsNecessary = Math.floor(NumberOfGames / 2) + 1;
    if (Number(e.target.value) - 1 >= winsNecessary) {
      setBlueWins(0);
    } else {
      setBlueWins(Number(e.target.value));
    }
  };

  const handleOrangeWinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) - 1 >= NumberOfGames / 2 + 1) {
      setOrangeWins(0);
    } else {
      setOrangeWins(Number(e.target.value));
    }
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
      setControlPanelSettings((prevSettings) => ({
        ...prevSettings,
        [teamKey]: base64,
      }));
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSettings = {
      ...controlPanelSettings,
      blueTeamName,
      orangeTeamName,
      blueTeamColor,
      orangeTeamColor,
      blueTeamFlipColor,
      orangeTeamFlipColor,
      flipUnavailableColor,
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
      newSettings.blueTeamFlipColor = newSettings.blueTeamColor;
      newSettings.orangeTeamFlipColor = newSettings.orangeTeamColor;
    }
    setControlPanelSettings(newSettings);
    console.log("CONTROLPANEL.TSX>>Updating Control Panel Settings From Form");
    updateSettings(newSettings);
    localStorage.setItem("controlPanelSettings", JSON.stringify(newSettings));
    // console.log("New Control Panel Settings:", newSettings);
    setFeedbackMessage("Settings updated successfully!");
    setTimeout(() => {
      setFeedbackMessage("");
    }, 3000);
  };

  useEffect(() => {
    const handleLoadSettings = (data: any) => {
      console.log("CONTROLPANEL.TSX>>Loaded Control Panel Settings From WS");
      setControlPanelSettings(data);
    };

    const handleUpdateSettings = (data: any) => {
      console.log(
        "CONTROLPANEL.TSX>>Updating Control Panel Settings (External component)"
      );
      setControlPanelSettings(data);
      //updateSettings(data);
    };
    const unsubscribeLoadSettings = subscribe(
      "loadSettings",
      handleLoadSettings
    );

    const unsubscribeUpdateSettings = subscribe(
      "updateSettings",
      handleUpdateSettings
    );

    // Clean up subscriptions when the component unmounts
    return () => {
      unsubscribeLoadSettings();
      unsubscribeUpdateSettings();
    };
  }, [subscribe, setControlPanelSettings]);

  useEffect(() => {
    const unsubscribe = subscribe("updateSettings", () => {
      console.log("Settings updated");
    });
    return () => unsubscribe();
  }, [subscribe]);
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
            value={blueTeamColor}
            onChange={handleBlueTeamColorChange}
            style={{ backgroundColor: blueTeamColor }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="orangeColor">Orange Team Color:</Label>
          <ColorPickerInput
            id="orangeColor"
            type="color"
            value={orangeTeamColor}
            onChange={handleOrangeTeamColorChange}
            style={{ backgroundColor: orangeTeamColor }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="blueFlipColor">Blue Team Flip Color:</Label>
          <ColorPickerInput
            id="blueFlipColor"
            type="color"
            value={blueTeamFlipColor}
            onChange={handleBlueTeamFlipColorChange}
            style={{ backgroundColor: blueTeamFlipColor }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="orangeFlipColor">Orange Team Flip Color:</Label>
          <ColorPickerInput
            id="orangeFlipColor"
            type="color"
            value={orangeTeamFlipColor}
            onChange={handleOrangeTeamFlipColorChange}
            style={{
              backgroundColor: orangeTeamFlipColor,
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="flipUnavailableColor">Flip Unavailable Color:</Label>
          <ColorPickerInput
            id="flipUnavailableColor"
            type="color"
            value={flipUnavailableColor}
            onChange={handleFlipUnavailableColorChange}
            style={{
              backgroundColor: flipUnavailableColor,
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
            <option value="9">9</option>
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
        <RowInput>
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
        <SubmitButton type="submit">Update Settings</SubmitButton>
        {feedbackMessage && (
          <div style={{ marginTop: "20px", color: "green" }}>
            {feedbackMessage}
          </div>
        )}
        <h1>DEVELOPER SETTINGS **HIDE LATER**</h1>
        <SubmitButton
          type="button"
          onClick={() => console.log(controlPanelSettings)}
        >
          Print Settings
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};
