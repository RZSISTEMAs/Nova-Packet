"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionHandler = void 0;
const net = __importStar(require("net"));
const Packet_1 = require("../packet/Packet");
class ConnectionHandler {
    server;
    LISTEN_PORT = 9090;
    // Configurable Target (Real Game Server)
    // For now, defaulting to a known static IP or localhost, usually this is configurable
    TARGET_HOST = 'game-us.habbo.com';
    TARGET_PORT = 30000;
    constructor() {
        this.server = net.createServer(this.handleConnection.bind(this));
    }
    start() {
        this.server.listen(this.LISTEN_PORT, () => {
            console.log(`[Nova-Packet] Proxy Listening on port ${this.LISTEN_PORT}`);
            console.log(`[Nova-Packet] Targeting ${this.TARGET_HOST}:${this.TARGET_PORT}`);
        });
    }
    handleConnection(clientSocket) {
        console.log('[Nova-Packet] Client Connected. Establishing link to Server...');
        const serverSocket = new net.Socket();
        // Connect to the real game server
        serverSocket.connect(this.TARGET_PORT, this.TARGET_HOST, () => {
            console.log('[Nova-Packet] Connected to Game Server!');
        });
        // Data from Client -> Proxy -> Server
        clientSocket.on('data', (data) => {
            // Intercept/Log
            // console.log(`[C->S] ${data.length} bytes`);
            // Forward
            if (!serverSocket.destroyed) {
                serverSocket.write(data);
            }
        });
        // Data from Server -> Proxy -> Client
        serverSocket.on('data', (data) => {
            // Intercept/Log
            // console.log(`[S->C] ${data.length} bytes`);
            // Forward
            if (!clientSocket.destroyed) {
                clientSocket.write(data);
            }
        });
        // Error Handling & Cleanup
        clientSocket.on('error', (err) => this.closeSockets(clientSocket, serverSocket, 'Client', err));
        serverSocket.on('error', (err) => this.closeSockets(clientSocket, serverSocket, 'Server', err));
        clientSocket.on('close', () => this.closeSockets(clientSocket, serverSocket, 'Client'));
        serverSocket.on('close', () => this.closeSockets(clientSocket, serverSocket, 'Server'));
    }
    closeSockets(client, server, source, err) {
        if (err)
            console.error(`[${source} Error] ${err.message}`);
        if (!client.destroyed)
            client.destroy();
        if (!server.destroyed)
            server.destroy();
    }
}
exports.ConnectionHandler = ConnectionHandler;
//# sourceMappingURL=ConnectionHandler.js.map