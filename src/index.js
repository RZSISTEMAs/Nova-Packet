"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionHandler_1 = require("./core/network/ConnectionHandler");
const WebServer_1 = require("./core/network/WebServer");
console.log('Nova-Packet Core Initializing...');
const webServer = new WebServer_1.WebServer();
webServer.start();
const network = new ConnectionHandler_1.ConnectionHandler(webServer);
network.start();
//# sourceMappingURL=index.js.map