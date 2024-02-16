// ControlPanel.tsx
import React, { useState, useContext, useEffect } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import { Form, FormGroup, Label, Input, Select, SubmitButton, FormWrapper, RowInput, CheckboxContainer, FileInputContainer, ImagePreview, LogoFormGroup, FileInputContainer2 } from "./ControlPanel.style";
import { ControlPanelContext } from "../../models/contexts/ControlPanelContext";


export const ControlPanel = () => {

  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const [blueTeamName, setBlueTeamName] = useState(
    controlPanelSettings.blueTeamName
  );
  const [orangeTeamName, setOrangeTeamName] = useState(
    controlPanelSettings.orangeTeamName
  );
  const [blueWins, setBlueWins] = useState(controlPanelSettings.blueWins);
  const [orangeWins, setOrangeWins] = useState(controlPanelSettings.orangeWins);
  const [NumberOfGames, setNumberOfGames] = useState(
    controlPanelSettings.NumberOfGames
  );
  const [showWinProb, setShowWinProb] = useState(
    controlPanelSettings.showWinProb
  );
  const [showSeriesScore, setShowSeriesScore] = useState(
    controlPanelSettings.showSeriesScore
  );
  const [metricOrImperial, setMetricOrImperial] = useState(
    controlPanelSettings.metricOrImperial
  );
  const [savedata, setSaveData] = useState(controlPanelSettings.savedata);
  const [serverPortNumber, setServerPortNumber] = useState(
    controlPanelSettings.serverPortNumber
  );

  const [blueTeamLogo, setBlueTeamLogo] = useState('');
  const [orangeTeamLogo, setOrangeTeamLogo] = useState('');
  const [blueTeamLogoPreview, setBlueTeamLogoPreview] = useState('');
  const [orangeTeamLogoPreview, setOrangeTeamLogoPreview] = useState('');


  const handleBlueTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlueTeamName(e.target.value);
  };

  const handleOrangeTeamNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrangeTeamName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, teamKey: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setControlPanelSettings((controlPanelSettings: ControlPanelContext) => ({
        ...controlPanelSettings,
        [teamKey]: url // Use keys like 'BlueTeamPhoto' and 'OrangeTeamPhoto'
      }));
    }
  };

    // UseEffect hooks for cleaning up image URL objects to avoid memory leaks
    useEffect(() => () => {
      URL.revokeObjectURL(blueTeamLogoPreview);
    }, [blueTeamLogoPreview]);
  
    useEffect(() => () => {
      URL.revokeObjectURL(orangeTeamLogoPreview);
    }, [orangeTeamLogoPreview]);

  const handleBlueWinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlueWins(Number(e.target.value));
  }
  
  const handleOrangeWinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrangeWins(Number(e.target.value));
  };

  const handleNumberOfGamesChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNumberOfGames(Number(e.target.value));
  };

  const handleShowWinProbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowWinProb(e.target.checked);
  };

  const handleShowSeriesScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowSeriesScore(e.target.checked);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Submitting",
      blueTeamName,
      orangeTeamName,
      blueWins,
      orangeWins,
      NumberOfGames,
      showWinProb,
      showSeriesScore,
      metricOrImperial,
      savedata,
      serverPortNumber
    );
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
      showWinProb,
      showSeriesScore,
      metricOrImperial,
      savedata,
      serverPortNumber,
    };
    setControlPanelSettings(newSettings);
    console.log("controlPanelSettings:", controlPanelSettings);
    localStorage.setItem("controlPanelSettings", JSON.stringify(newSettings));
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
            {blueTeamLogo && <ImagePreview src={blueTeamLogoPreview} alt="Blue Team Logo Preview" />}
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
            {orangeTeamLogo && <ImagePreview src={orangeTeamLogoPreview} alt="Orange Team Logo Preview" />}
          </FileInputContainer2>
        </LogoFormGroup>
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
          <Label htmlFor="showWinProb">Show Win Probability:</Label>
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
          <Label htmlFor="showSeriesScore">Show Series Score:</Label>
          <CheckboxContainer>
            <Input
              id="showSeriesScore"
              type="checkbox"
              checked={showSeriesScore}
              onChange={handleShowSeriesScoreChange}
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
      </Form>
    </FormWrapper>
  );
};
