export const websocketService = {
    __subscribers: {},
    websocket: undefined,
    webSocketConnected: false,
    registerQueue: [],
    init: function(port, debug, debugFilters) {
        port = port || 49322;
        debug = debug || false;
        if (debug) {
            if (debugFilters !== undefined) {
                console.warn("WebSocket Debug Mode enabled with filtering. Only events not in the filter list will be dumped");
            } else {
                console.warn("WebSocket Debug Mode enabled without filters applied. All events will be dumped to console");
                console.warn("To use filters, pass in an array of 'channel:event' strings to the second parameter of the init function");
            }
        }
        websocketService.webSocket = new WebSocket("ws://localhost:" + port);
        websocketService.webSocket.onmessage = function (event) {
            let jEvent = JSON.parse(event.data);
            if (!jEvent.hasOwnProperty('event')) {
                return;
            }
            let eventSplit = jEvent.event.split(':');
            let channel = eventSplit[0];
            let event_event = eventSplit[1];
            if (debug) {
                if (!debugFilters) {
                    console.log(channel, event_event, jEvent);
                } else if (debugFilters && debugFilters.indexOf(jEvent.event) < 0) {
                    console.log(channel, event_event, jEvent);
                }
            }
            websocketService.triggerSubscribers(channel, event_event, jEvent.data);
        };
        websocketService.webSocket.onopen = function () {
            websocketService.triggerSubscribers("ws", "open");
            websocketService.webSocketConnected = true;
            websocketService.registerQueue.forEach((r) => {
                websocketService.send("wsRelay", "register", r);
            });
            websocketService.registerQueue = [];
        };
        websocketService.webSocket.onerror = function () {
            websocketService.triggerSubscribers("ws", "error");
            websocketService.webSocketConnected = false;
        };
        websocketService.webSocket.onclose = function () {
            websocketService.triggerSubscribers("ws", "close");
            websocketService.webSocketConnected = false;
        };
    },
    /**
     * Add callbacks for when certain events are thrown
     * Execution is guaranteed to be in First In First Out order
     * @param channels
     * @param events
     * @param callback
     */
    subscribe: function(channels, events, callback) {
        if (typeof channels === "string") {
            let channel = channels;
            channels = [];
            channels.push(channel);
        }
        if (typeof events === "string") {
            let event = events;
            events = [];
            events.push(event);
        }
        channels.forEach(function(c) {
            events.forEach(function (e) {
                if (!websocketService.__subscribers.hasOwnProperty(c)) {
                    websocketService.__subscribers[c] = {};
                }
                if (!websocketService.__subscribers[c].hasOwnProperty(e)) {
                    websocketService.__subscribers[c][e] = [];
                    if (websocketService.webSocketConnected) {
                        websocketService.send("wsRelay", "register", `${c}:${e}`);
                    } else {
                        websocketService.registerQueue.push(`${c}:${e}`);
                    }
                }
                websocketService.__subscribers[c][e].push(callback);
            });
        })
    },
    clearEventCallbacks: function (channel, event) {
        if (websocketService.__subscribers.hasOwnProperty(channel) && websocketService.__subscribers[channel].hasOwnProperty(event)) {
            websocketService.__subscribers[channel] = {};
        }
    },
    triggerSubscribers: function (channel, event, data) {
        if (websocketService.__subscribers.hasOwnProperty(channel) && websocketService.__subscribers[channel].hasOwnProperty(event)) {
            websocketService.__subscribers[channel][event].forEach(function(callback) {
                if (callback instanceof Function) {
                    callback(data);
                }
            });
        }
    },
    send: function (channel, event, data) {
        if (typeof channel !== 'string') {
            console.error("Channel must be a string");
            return;
        }
        if (typeof event !== 'string') {
            console.error("Event must be a string");
            return;
        }
        if (channel === 'local') {
            this.triggerSubscribers(channel, event, data);
        } else {
            let cEvent = channel + ":" + event;
            websocketService.webSocket.send(JSON.stringify({
                'event': cEvent,
                'data': data
            }));
        }
    }
};
