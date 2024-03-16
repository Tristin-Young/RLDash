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

import { transformGameUpdate } from "../../contexts/transformGameUpdate";
import { UpdateStateContext } from "../../contexts/UpdateStateContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { transformStatfeedEvent } from "../../contexts/transformStatfeedEvent";
import { StatfeedEventContext } from "../../contexts/StatfeedEventContext";
import { stat } from "fs";

export const ControlPanel = () => {
  const { controlPanelSettings, setControlPanelSettings } = useContext(
    ControlPanelSettingsContext
  );
  const { subscribe } = useContext(WebsocketContext);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [winProcessed, setWinProcessed] = useState(
    controlPanelSettings.winProcessed
  );
  const [showOverlayBE, setShowOverlayBE] = useState(
    controlPanelSettings.showOverlayBE
  );
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
      // Assuming setControlPanelSettings is a function that updates the local state
      // and `controlPanelSettings` is your current settings state
      setControlPanelSettings((prevSettings) => ({
        ...prevSettings,
        [teamKey]: base64, // teamKey might be "BlueTeamPhoto" or "OrangeTeamPhoto"
      }));
    }
  }
  function handleWinProcessedChange() {
    setWinProcessed((winProcessed) => !winProcessed);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    winProcessed ?? setWinProcessed(false);
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
      showOverlayBE,
      winProcessed: false,
    };
    if (newSettings.useTeamColorsForFlipColors) {
      newSettings.blueTeamFlipColor = newSettings.blueTeamColor; // Use the team color for flip color
      newSettings.orangeTeamFlipColor = newSettings.orangeTeamColor; // Use the team color for flip color
    }
    setControlPanelSettings(newSettings);
    localStorage.setItem("controlPanelSettings", JSON.stringify(newSettings));
    console.log("New Control Panel Settings:", newSettings);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "updateSettings", data: newSettings }));
      //console.log(newSettings);
    }
    setFeedbackMessage("Settings updated successfully!");
    setTimeout(() => {
      setFeedbackMessage("");
    }, 3000);
  };

  //function to handle submit without a form
  const handleUpdateSettings = (
    blueWinsVar: number,
    orangeWinsVar: number,
    winProcessedVar: boolean
  ) => {
    winProcessed ?? setWinProcessed(false);
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
      blueWins: blueWinsVar,
      orangeWins: orangeWinsVar,
      NumberOfGames,
      showTeamWins,
      SeriesScoreWinPercent,
      showFlipResets,
      showPlayerSpeed,
      metricOrImperial,
      savedata,
      serverPortNumber,
      showOverlayBE,
      winProcessed: winProcessedVar,
    };
    if (newSettings.useTeamColorsForFlipColors) {
      newSettings.blueTeamFlipColor = newSettings.blueTeamColor; // Use the team color for flip color
      newSettings.orangeTeamFlipColor = newSettings.orangeTeamColor; // Use the team color for flip color
    }
    setControlPanelSettings(newSettings);
    localStorage.setItem("controlPanelSettings", JSON.stringify(newSettings));
    console.log("HU New Control Panel Settings:", newSettings);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "updateSettings", data: newSettings }));
      //console.log(newSettings);
    }
  };

  useEffect(() => {
    const handleStatfeedUpdate = (innerMessage: any) => {
      if (innerMessage.event === "game:statfeed_event") {
        if (innerMessage.data.event_name === "MVP") {
          const statfeedData = transformStatfeedEvent(innerMessage);
          const winsNecessary =
            Math.floor(controlPanelSettings.NumberOfGames / 2) + 1;
          let orangeWinsVar = orangeWins;
          let blueWinsVar = blueWins;
          let orangeWinsVarPadded = orangeWins + 1;
          let blueWinsVarPadded = blueWins + 1;
          console.log("Received Statfeed Event Data:", statfeedData);
          if (controlPanelSettings.winProcessed === false) {
            if (statfeedData.main_target.team_num === 0) {
              if (blueWinsVarPadded < winsNecessary) {
                blueWinsVar++;
                console.log("Blue Team Wins:", blueWins);
                console.log("Setting Blue Wins:", blueWinsVar);
                setBlueWins(blueWinsVar);
                console.log("Setting Win Processed to true");
                setWinProcessed(true);
                //console.log("Settings being sent as update:", controlPanelSettings);
                handleUpdateSettings(blueWinsVar, orangeWinsVar, true);
              } else {
                console.log("Blue Team Wins:", blueWins);
                console.log("Setting Blue Wins:", blueWinsVar);
                setBlueWins(0);
                setOrangeWins(0);
                console.log("Setting Win Processed to true");
                setWinProcessed(true);
                //console.log("Settings being sent as update:", controlPanelSettings);
                handleUpdateSettings(0, 0, true);
              }
            } else if (statfeedData.main_target.team_num === 1) {
              if (orangeWinsVarPadded < winsNecessary) {
                orangeWinsVar++;
                console.log("Orange Team Wins:", orangeWins);
                console.log("Setting Orange Wins:", orangeWinsVar);
                setOrangeWins(orangeWinsVar);
                console.log("Setting Win Processed to true");
                setWinProcessed(true);
                //console.log("Settings being sent as update:", controlPanelSettings);
                handleUpdateSettings(blueWinsVar, orangeWinsVar, true);
              } else {
                console.log("Orange Team Wins:", orangeWins);
                console.log("Setting Orange Wins:", orangeWinsVar);
                setOrangeWins(0);
                setBlueWins(0);
                console.log("Setting Win Processed to true");
                setWinProcessed(true);
                //console.log("Settings being sent as update:", controlPanelSettings);
                handleUpdateSettings(0, 0, true);
              }
            }

            console.log("Settings update attempted");
            // Consider moving handleUpdateSettings call here, ensure it's the logic you want.
          } else {
            console.log("Statfeed event already processed");
          }
        }
      }
    };

    // Subscribe to the specific event
    const unsubscribe = subscribe(
      "game:statfeed_event_MVP",
      handleStatfeedUpdate
    );

    // Cleanup function to unsubscribe
    return () => unsubscribe();
  }, [subscribe, winProcessed, blueWins, orangeWins]);

  // useEffect(() => {
  //   console.log("Win Processed:", winProcessed);

  //   handleUpdateSettings();
  // }, [winProcessed]);

  useEffect(() => {
    const handleGameStarted = (innerMessage: any) => {
      //console.log("handleGameStarted useEffect touched");
      if (innerMessage.event === "gamestate") {
        if (
          innerMessage.event === "game:post_countdown_begin" ||
          (innerMessage.event === "gamestate" &&
            innerMessage.game.hasWinner === false)
        ) {
          if (controlPanelSettings.winProcessed === true) {
            console.log("Setting winProcessed to false (handleGameStarted)");
            handleUpdateSettings(blueWins, orangeWins, false);
          }
        }
      }
    };

    const unsubscribe = subscribe("gamestate", handleGameStarted);
    const unsubscribePostCountdownBegin = subscribe(
      "game:post_countdown_begin",
      handleGameStarted
    );

    return () => {
      unsubscribe();
      unsubscribePostCountdownBegin();
    };
  }, [subscribe, winProcessed]);
  //function to print current settings to console
  const printSettings = () => {
    console.log(controlPanelSettings);
    setFeedbackMessage("Settings printed to console!");
    setTimeout(() => {
      setFeedbackMessage("");
    }, 3000);
  };

  // Rest of the code...

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
        <SubmitButton type="button" onClick={printSettings}>
          {" "}
          Print Settings
        </SubmitButton>
        {feedbackMessage && (
          <div style={{ marginTop: "20px", color: "green" }}>
            {feedbackMessage}
          </div>
        )}
      </Form>
    </FormWrapper>
  );
};
