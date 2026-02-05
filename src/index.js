"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionHandler_1 = require("./core/network/ConnectionHandler");
console.log('Nova-Packet Core Initializing...');
const network = new ConnectionHandler_1.ConnectionHandler();
network.start();
//# sourceMappingURL=index.js.map