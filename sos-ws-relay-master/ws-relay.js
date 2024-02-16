const WebSocket = require("ws");
const { success, error, warn, info, log } = require("cli-msg");
const atob = require("atob");

/**
 * Environment variable for Rocket League WebSocket host.
 * Defaulting to localhost:49122 if not specified.
 */
const ROCKET_LEAGUE_HOST = process.env.ROCKET_LEAGUE_HOST || "localhost:49122";
const WSS_PORT = process.env.WSS_PORT || "49322";

let wsClient;
let relayMsDelay = parseInt(process.env.RELAY_MS_DELAY || "0", 10);

const wss = new WebSocket.Server({ port: WSS_PORT });
let connections = {};
info.wb(`Opened WebSocket server on port ${WSS_PORT}`);

wss.on("connection", function connection(ws) {
  let id = (+new Date()).toString();
  success.wb(`Received connection: ${id}`);
  connections[id] = {
    connection: ws,
    registeredFunctions: [],
  };

  ws.send(JSON.stringify({
    event: "wsRelay:info",
    data: "Connected!",
  }));

  ws.on("message", function incoming(message) {
    sendRelayMessage(id, message);
  });

  ws.on("close", function close() {
    delete connections[id];
  });
});

initRocketLeagueWebsocket(ROCKET_LEAGUE_HOST);

setInterval(function () {
  if (wsClient.readyState === WebSocket.CLOSED) {
    warn.wb(`Rocket League WebSocket Server Closed. Attempting to reconnect to ${ROCKET_LEAGUE_HOST}`);
    initRocketLeagueWebsocket(ROCKET_LEAGUE_HOST);
  }
}, 10000);

function sendRelayMessage(senderConnectionId, message) {
  let json = JSON.parse(message);
  log.wb(`${senderConnectionId}> Sent ${json.event}`);
  let channelEvent = json["event"].split(":");
  if (channelEvent[0] === "wsRelay") {
    handleWsRelayEvents(senderConnectionId, channelEvent[1], json["data"]);
    return;
  }
  relayToRegisteredFunctions(senderConnectionId, json);
}

function handleWsRelayEvents(senderConnectionId, action, data) {
  switch (action) {
    case "register":
      registerFunction(senderConnectionId, data);
      break;
    case "unregister":
      unregisterFunction(senderConnectionId, data);
      break;
    default:
      warn.wb(`${senderConnectionId}> Unknown wsRelay action: ${action}`);
  }
}

function registerFunction(senderConnectionId, functionName) {
  if (!connections[senderConnectionId].registeredFunctions.includes(functionName)) {
    connections[senderConnectionId].registeredFunctions.push(functionName);
    info.wb(`${senderConnectionId}> Registered to receive: ${functionName}`);
  } else {
    warn.wb(`${senderConnectionId}> Attempted to register an already registered function: ${functionName}`);
  }
}

function unregisterFunction(senderConnectionId, functionName) {
  const idx = connections[senderConnectionId].registeredFunctions.indexOf(functionName);
  if (idx > -1) {
    connections[senderConnectionId].registeredFunctions.splice(idx, 1);
    info.wb(`${senderConnectionId}> Unregistered: ${functionName}`);
  } else {
    warn.wb(`${senderConnectionId}> Attempted to unregister a non-registered function: ${functionName}`);
  }
}

function relayToRegisteredFunctions(senderConnectionId, json) {
  Object.keys(connections).forEach(k => {
    if (senderConnectionId === k || !connections[k].registeredFunctions.includes(json["event"])) return;
    setTimeout(() => {
      try {
        connections[k].connection.send(JSON.stringify(json));
      } catch (e) {
        // Connection might close between check and send, so catch and ignore
      }
    }, relayMsDelay);
  });
}

function initRocketLeagueWebsocket(rocketLeagueHost) {
  wsClient = new WebSocket(`ws://${rocketLeagueHost}`);

  wsClient.onopen = function open() {
    success.wb(`Connected to Rocket League on ${rocketLeagueHost}`);
  };

  wsClient.onmessage = function (message) {
    let sendMessage = message.data.startsWith("{") ? message.data : atob(message.data);
    setTimeout(() => sendRelayMessage(0, sendMessage), relayMsDelay);
  };

  wsClient.onerror = function (err) {
    error.wb(`Error connecting to Rocket League on host "${rocketLeagueHost}"\nIs the plugin loaded into Rocket League? Run the command "plugin load sos" from the BakkesMod console to make sure.`);
  };
}
