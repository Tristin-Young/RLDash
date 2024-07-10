const { Server, OPEN } = require('ws');
const fs = require('fs-extra');
const PORT = 42000;
const settingsFilePath = './controlPanelSettings.json';

console.log(`WebSocket server started on ws://localhost:${PORT}`);

const wss = new Server({ port: PORT });

// Function to save settings
async function saveSettings(settings) {
  await fs.writeJson(settingsFilePath, settings);
}

// Function to load settings
async function loadSettings() {
  try {
    const fileContent = await fs.readFile(settingsFilePath, 'utf8');
    if (!fileContent) {
      throw new Error('Settings file is empty');
    }
    return JSON.parse(fileContent);
  } catch (error) {
    console.log('Error loading settings:', error.message);
    const defaultSettings = {
      blueTeamName: "GMU",
      orangeTeamName: "CANA",
      blueWins: 0,
      orangeWins: 0,
      useTeamColorsForFlipColors: true,
      blueTeamColor: "#305DFF",
      orangeTeamColor: "#FF7900",
      blueTeamFlipColor: "#305DFF",
      orangeTeamFlipColor: "#FF7900",
      flipUnavailableColor: "#A3A3A3",
      NumberOfGames: 5,
      showTeamWins: true,
      SeriesScoreWinPercent: "SeriesScore",
      showFlipResets: false,
      metricOrImperial: "KPH",
      savedata: false,
      serverPortNumber: 3000,
      BlueTeamPhoto: "",
      OrangeTeamPhoto: ""
    };
    await saveSettings(defaultSettings);
    return defaultSettings;
  }
}

wss.on('connection', async (ws) => {
  console.log('Client connected');

  const currentSettings = await loadSettings();
  console.log('Sending current settings on connection:', currentSettings);
  ws.send(JSON.stringify({ event: 'loadSettings', data: currentSettings }));

  ws.on('message', async (data) => {
    const message = JSON.parse(data);
    console.log("Processing message:", message);

    switch (message.event) {
      case 'updateSettings':
        console.log('Updating settings with data:', message.data);
        await saveSettings(message.data);
        const updatedSettings = await loadSettings();
        console.log('Broadcasting updated settings:', updatedSettings);
        broadcast(JSON.stringify({ event: 'updateSettings', data: updatedSettings }), ws);
        break;
      case 'loadSettings':
        console.log('Loading settings');
        const settings = await loadSettings();
        console.log('Sending loaded settings:', settings);
        ws.send(JSON.stringify({ event: 'loadSettings', data: settings }));
        break;
      default:
        console.log('Unknown message type:', message.event);
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast message to all clients except the sender
function broadcast(data, senderWs) {
  wss.clients.forEach((client) => {
    if (client !== senderWs && client.readyState === OPEN) {
      console.log('Broadcasting data to client:', data);
      client.send(data);
    }
  });
}
