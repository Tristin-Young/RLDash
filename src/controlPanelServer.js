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
    return await fs.readJson(settingsFilePath);
  } catch (error) {
    console.log('Error loading settings:', error);
    return {
      blueTeamName: "GMU",
      orangeTeamName: "CANA",
      blueWins: 0,
      orangeWins: 0,
      blueTeamColor: "#00E8F4",
      orangeTeamColor: "#F59323",
      NumberOfGames: 5,
      SeriesScoreWinPercent: "SeriesScore",
      // showWinProb: false,
      // showSeriesScore: false,
      showFlipResets: false,
      metricOrImperial: "KPH",
      savedata: false,
      serverPortNumber: 3000,
      BlueTeamPhoto: "",
      OrangeTeamPhoto: ""
    };
  }
}

wss.on('connection', async (ws) => {
  console.log('Client connected');

  // Send current settings to newly connected client
  const currentSettings = await loadSettings();
  ws.send(JSON.stringify({ type: 'loadSettings', data: currentSettings }));

  ws.on('message', async (data) => {
    console.log('Received message:', data);
    const message = JSON.parse(data);

    switch (message.type) {
      case 'updateSettings':
        // Save the updated settings and broadcast them
        await saveSettings(message.data);
        broadcast(JSON.stringify({ type: 'updateSettings', data: message.data }), ws);
        break;
      case 'requestSettings':
        // Optionally handle a direct request for current settings
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast message to all clients except the sender
function broadcast(data, senderWs) {
  wss.clients.forEach((client) => {
    if (client !== senderWs && client.readyState === OPEN) {
      client.send(data);
    }
  });
}