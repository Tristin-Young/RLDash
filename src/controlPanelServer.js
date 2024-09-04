const { Server, OPEN } = require('ws');
const fs = require('fs-extra');
const PORT = 42000;
const settingsFilePath = './controlPanelSettings.json';

const wss = new Server({ port: PORT });
console.log(`WebSocket server started on ws://localhost:${PORT}`);
console.log(`WebSocket server started on ws://localhost:${PORT}`);

// Function to save settings
async function saveSettings(settings) {
  try {
    await fs.writeJson(settingsFilePath, settings);
    console.log('Settings saved to local file');
  } catch (error) {
    console.error('Error saving settings:', error);
  }
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
    console.error('Error loading settings:', error.message);
    const defaultSettings = {
      blueTeamName: "CANA",
      orangeTeamName: "CANA",
      blueWins: 0,
      orangeWins: 0,
      useTeamColorsForFlipColors: true,
      blueTeamColor: "#305DFF",
      orangeTeamColor: "#FF7900",
      blueTeamFlipColor: "#305DFF",
      orangeTeamFlipColor: "#FF7900",
      flipUnavailableColor: "#A3A3A3",
      blueWins: 0,
      orangeWins: 0,
      NumberOfGames: 5,
      showTeamWins: true,
      SeriesScoreWinPercent: "SeriesScore",
      showFlipResets: true,
      showPlayerSpeed: true,
      metricOrImperial: "KPH",
      savedata: true,
      serverPortNumber: 3000,
      showOverlayBE: false,
      winProcessed: false,
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
  ws.send(JSON.stringify({ event: 'loadSettings', data: currentSettings }));

  ws.on('message', async (data) => {
    const message = JSON.parse(data);
    console.log("Processing message:", message.event);

    switch (message.event) {
      case 'updateSettings':
        console.log('Updating settings with data:', message.data);
        await saveSettings(message.data);
        const updatedSettings = await loadSettings();
        broadcast(JSON.stringify({ event: 'updateSettings', data: updatedSettings }));
        break;
      case 'loadSettings':
        console.log('Loading settings');
        const settings = await loadSettings();
        ws.send(JSON.stringify({ event: 'loadSettings', data: settings }));
        break;
      default:
        console.log('Unknown message type:', message.event);
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast message to all clients
function broadcast(data, senderWs = null) {
  wss.clients.forEach((client) => {
    if (client.readyState === OPEN) {
      console.log('Broadcasting data to client:', JSON.parse(data).event);
      client.send(data);
    }
  });
}

