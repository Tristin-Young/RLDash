import React, { useContext, useState, useEffect } from "react";
import { ControlPanelSettingsContext } from "../../contexts/ControlPanelSettingsContext";
import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  FormWrapper,
  ColorPickerInput,
  TwoColumnRow,
  Select,
  CheckboxContainer,
  CheckboxLabel,
  DynamicCheckbox,
  CheckboxContainer2,
  GreyOverlay,
  LockedMessage,
} from "./ControlPanel.style";
import { WebsocketContext } from "../../contexts/WebsocketContext";

export const ControlPanel = () => {
  const {
    controlPanelSettings,
    setControlPanelSettings,
    subscribe: controlPanelSubscribe,
    updateSettings,
  } = useContext(ControlPanelSettingsContext);

  const { subscribe: websocketSubscribe } = useContext(WebsocketContext); // Renaming subscribe from WebsocketContext
  const [isFormLocked, setIsFormLocked] = useState(false);

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
  const [showOverlayBE, setShowOverlayBE] = useState(
    controlPanelSettings.showOverlayBE
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

  // const handleShowTeamWinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setShowTeamWins(e.target.checked);
  // };

  // const handleBlueTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setBlueTeamName(e.target.value);
  // };

  // const handleOrangeTeamNameChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setOrangeTeamName(e.target.value);
  // };

  // const handleUseTeamColorsForFlipColorsChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setUseTeamColorsForFlipColors(e.target.checked);
  // };

  // const handleBlueTeamColorChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setBlueTeamColor(e.target.value);
  // };

  // const handleOrangeTeamColorChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setOrangeTeamColor(e.target.value);
  // };

  // const handleBlueTeamFlipColorChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setBlueTeamFlipColor(e.target.value);
  // };

  // const handleOrangeTeamFlipColorChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setOrangeTeamFlipColor(e.target.value);
  // };

  // const handleFlipUnavailableColorChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setFlipUnavailableColor(e.target.value);
  // };

  // const handleBlueWinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let winsNecessary = Math.floor(NumberOfGames / 2) + 1;
  //   if (Number(e.target.value) - 1 >= winsNecessary) {
  //     setBlueWins(0);
  //   } else {
  //     setBlueWins(Number(e.target.value));
  //   }
  // };

  // const handleOrangeWinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (Number(e.target.value) >= NumberOfGames / 2 + 1) {
  //     setOrangeWins(0);
  //   } else {
  //     setOrangeWins(Number(e.target.value));
  //   }
  // };

  // const handleNumberOfGamesChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setNumberOfGames(Number(e.target.value));
  // };

  // const handleShowPlayerSpeedChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setShowPlayerSpeed(e.target.checked);
  // };

  // const handleShowFlipResetsChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setShowFlipResets(e.target.checked);
  // };

  // const handleSeriesScoreWinPercentChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setSeriesScoreWinPercent(e.target.value);
  // };

  // const handleMetricOrImperialChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setMetricOrImperial(e.target.value);
  // };

  // const handleSaveDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSaveData(e.target.checked);
  // };

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
    if (isFormLocked) {
      console.log("Form is locked");
      return;
    }
    setShowOverlayBE(false);
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
      showOverlayBE,
      useTeamColorsForFlipColors,
    };
    if (newSettings.useTeamColorsForFlipColors) {
      newSettings.blueTeamFlipColor = newSettings.blueTeamColor;
      newSettings.orangeTeamFlipColor = newSettings.orangeTeamColor;
    }
    setControlPanelSettings(newSettings);
    //console.log("CONTROLPANEL.TSX>>Updating Control Panel Settings From Form");
    updateSettings(newSettings);
    localStorage.setItem("controlPanelSettings", JSON.stringify(newSettings));
    // console.log("New Control Panel Settings:", newSettings);
    setFeedbackMessage("Settings updated successfully!");
    setTimeout(() => {
      setFeedbackMessage("");
    }, 3000);
  };
  useEffect(() => {
    const handleLockEvent = () => {
      console.log(
        "Event detected (podium/replay): locking the form for 10 seconds"
      );
      setIsFormLocked(true); // Lock the form

      setTimeout(() => {
        console.log("Form unlocked after 10 seconds");
        setIsFormLocked(false); // Unlock after 5 seconds
      }, 10000);
    };

    // Subscribe to both "game:podium_start" and "game:replay_start"
    const unsubscribePodium = websocketSubscribe(
      "game:podium_start",
      handleLockEvent
    );
    const unsubscribeReplay = websocketSubscribe(
      "game:replay_start",
      handleLockEvent
    );

    // Cleanup subscriptions when component unmounts
    return () => {
      unsubscribePodium();
      unsubscribeReplay();
    };
  }, [websocketSubscribe]);

  useEffect(() => {
    const handleLoadSettings = (data: any) => {
      //console.log("CONTROLPANEL.TSX>>Loaded Control Panel Settings From WS");
      setControlPanelSettings(data);
    };

    const handleUpdateSettings = (data: any) => {
      //console.log(
      //   "CONTROLPANEL.TSX>>Updating Control Panel Settings (External component)"
      // );
      setControlPanelSettings(data);
      //updateSettings(data);
    };
    const unsubscribeLoadSettings = controlPanelSubscribe(
      "loadSettings",
      handleLoadSettings
    );

    const unsubscribeUpdateSettings = controlPanelSubscribe(
      "updateSettings",
      handleUpdateSettings
    );

    // Clean up subscriptions when the component unmounts
    return () => {
      unsubscribeLoadSettings();
      unsubscribeUpdateSettings();
    };
  }, [controlPanelSubscribe, setControlPanelSettings]);

  useEffect(() => {
    const unsubscribe = controlPanelSubscribe("updateSettings", () => {
      // console.log("Settings updated");
    });
    return () => unsubscribe();
  }, [controlPanelSubscribe]);
  return (
    <FormWrapper>
      {isFormLocked && (
        <div>
          <GreyOverlay />
          <LockedMessage>Form is locked</LockedMessage>
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        {/* Team Names */}
        <TwoColumnRow>
          <FormGroup>
            <Label htmlFor="blueName">Blue Team Name:</Label>
            <Input
              id="blueName"
              type="text"
              value={blueTeamName}
              onChange={(e) => setBlueTeamName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="orangeName">Orange Team Name:</Label>
            <Input
              id="orangeName"
              type="text"
              value={orangeTeamName}
              onChange={(e) => setOrangeTeamName(e.target.value)}
            />
          </FormGroup>
        </TwoColumnRow>

        {/* Team Logos */}
        <TwoColumnRow>
          <div>
            <FormGroup>
              <Label htmlFor="blueTeamLogo">Blue Team Logo:</Label>
              <Input
                id="blueTeamLogo"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "BlueTeamPhoto")}
              />
            </FormGroup>
            {blueTeamLogoPreview && (
              <img
                src={blueTeamLogoPreview}
                alt="Blue Team Logo"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </div>
          <div>
            <FormGroup>
              <Label htmlFor="orangeTeamLogo">Orange Team Logo:</Label>
              <Input
                id="orangeTeamLogo"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "OrangeTeamPhoto")}
              />
            </FormGroup>
            {orangeTeamLogoPreview && (
              <img
                src={orangeTeamLogoPreview}
                alt="Orange Team Logo"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </div>
        </TwoColumnRow>

        {/* Team Colors and Flip Colors */}
        <TwoColumnRow>
          <div>
            <CheckboxContainer>
              <DynamicCheckbox
                id="useTeamColorsForFlipColors"
                checked={useTeamColorsForFlipColors}
                onChange={(e) =>
                  setUseTeamColorsForFlipColors(e.target.checked)
                }
              />
              <CheckboxLabel htmlFor="useTeamColorsForFlipColors">
                Use Team Colors for Flip Colors
              </CheckboxLabel>
            </CheckboxContainer>
            <FormGroup>
              <Label htmlFor="blueColor">Blue Team Color:</Label>
              <ColorPickerInput
                id="blueColor"
                type="color"
                value={blueTeamColor}
                onChange={(e) => setBlueTeamColor(e.target.value)}
                style={{ backgroundColor: blueTeamColor }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="blueFlipColor">Blue Team Flip Color:</Label>
              <ColorPickerInput
                id="blueFlipColor"
                type="color"
                value={blueTeamFlipColor}
                onChange={(e) => setBlueTeamFlipColor(e.target.value)}
                disabled={useTeamColorsForFlipColors}
                style={{
                  backgroundColor: useTeamColorsForFlipColors
                    ? blueTeamColor
                    : blueTeamFlipColor,
                }}
              />
            </FormGroup>
          </div>

          <div>
            <FormGroup>
              <Label htmlFor="flipUnavailableColor">
                Flip Unavailable Color:
              </Label>
              <ColorPickerInput
                id="flipUnavailableColor"
                type="color"
                value={controlPanelSettings.flipUnavailableColor}
                onChange={(e) => setFlipUnavailableColor(e.target.value)}
                style={{
                  backgroundColor: flipUnavailableColor,
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="orangeColor">Orange Team Color:</Label>
              <ColorPickerInput
                id="orangeColor"
                type="color"
                value={orangeTeamColor}
                onChange={(e) => setOrangeTeamColor(e.target.value)}
                style={{ backgroundColor: orangeTeamColor }}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="orangeFlipColor">Orange Team Flip Color:</Label>
              <ColorPickerInput
                id="orangeFlipColor"
                type="color"
                value={orangeTeamFlipColor}
                onChange={(e) => setOrangeTeamFlipColor(e.target.value)}
                disabled={useTeamColorsForFlipColors}
                style={{
                  backgroundColor: useTeamColorsForFlipColors
                    ? orangeTeamColor
                    : orangeTeamFlipColor,
                }}
              />
            </FormGroup>
          </div>
        </TwoColumnRow>

        {/* Team Wins */}
        <TwoColumnRow>
          <FormGroup>
            <Label htmlFor="blueWinCount">Blue Win Count:</Label>
            <Input
              id="blueWinCount"
              type="number"
              value={blueWins}
              onChange={(e) => {
                const newBlueWins = Number(e.target.value);
                const winsNecessary = Math.floor(NumberOfGames / 2) + 1;
                if (newBlueWins > winsNecessary) {
                  setBlueWins(0);
                } else {
                  setBlueWins(newBlueWins);
                }
              }}
              min={0}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="orangeWinCount">Orange Win Count:</Label>
            <Input
              id="orangeWinCount"
              type="number"
              value={orangeWins}
              onChange={(e) => {
                const newOrangeWins = Number(e.target.value);
                const winsNecessary = Math.floor(NumberOfGames / 2) + 1;
                if (newOrangeWins > winsNecessary) {
                  setOrangeWins(0);
                } else {
                  setOrangeWins(newOrangeWins);
                }
              }}
              min={0}
            />
          </FormGroup>
        </TwoColumnRow>

        {/* Series Length and Unit Preference */}
        <TwoColumnRow>
          <div>
            <FormGroup>
              <Label htmlFor="NumberOfGames">Series Length:</Label>
              <Select
                id="NumberOfGames"
                value={NumberOfGames}
                onChange={(e) => setNumberOfGames(Number(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="metricOrImperial">Unit Preference:</Label>
              <Select
                id="metricOrImperial"
                value={metricOrImperial}
                onChange={(e) => setMetricOrImperial(e.target.value)}
              >
                <option value="MPH">MPH</option>
                <option value="KPH">KPH</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="SeriesScoreWinPercent">
                Show Series Score / Win Percent:
              </Label>
              <Select
                id="SeriesScoreWinPercent"
                value={SeriesScoreWinPercent}
                onChange={(e) => setSeriesScoreWinPercent(e.target.value)}
              >
                <option value="SeriesScore">Series Score</option>
                <option value="WinPercent">Win Percent</option>
                <option value="Both">Both</option>
                <option value="None">None</option>
              </Select>
            </FormGroup>
          </div>

          <div>
            <FormGroup>
              <CheckboxContainer2>
                <DynamicCheckbox
                  id="showTeamWins"
                  checked={showTeamWins}
                  onChange={(e) => setShowTeamWins(e.target.checked)}
                />
                <CheckboxLabel htmlFor="showTeamWins">
                  Show Team Wins
                </CheckboxLabel>
              </CheckboxContainer2>

              <CheckboxContainer2>
                <DynamicCheckbox
                  id="savedata"
                  checked={savedata}
                  onChange={(e) => setSaveData(e.target.checked)}
                />
                <CheckboxLabel htmlFor="savedata">Save Data</CheckboxLabel>
              </CheckboxContainer2>

              <CheckboxContainer2>
                <DynamicCheckbox
                  id="showPlayerSpeed"
                  checked={showPlayerSpeed}
                  onChange={(e) => setShowPlayerSpeed(e.target.checked)}
                />
                <CheckboxLabel htmlFor="showPlayerSpeed">
                  Show Player Speed
                </CheckboxLabel>
              </CheckboxContainer2>

              <CheckboxContainer2>
                <DynamicCheckbox
                  id="showFlipResets"
                  checked={showFlipResets}
                  onChange={(e) => setShowFlipResets(e.target.checked)}
                />
                <CheckboxLabel htmlFor="showFlipResets">
                  Show Flip Available
                </CheckboxLabel>
              </CheckboxContainer2>
            </FormGroup>
          </div>
        </TwoColumnRow>

        <SubmitButton type="submit">Update Settings</SubmitButton>
        {feedbackMessage && <div>{feedbackMessage}</div>}
      </Form>
    </FormWrapper>
  );
};
