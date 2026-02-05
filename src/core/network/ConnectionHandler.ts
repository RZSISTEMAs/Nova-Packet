import * as net from 'net';
import { Packet } from '../packet/Packet';

export class ConnectionHandler {
    private server: net.Server;
    private readonly LISTEN_PORT = 9090;
    
    // Configurable Target (Real Game Server)
    // For now, defaulting to a known static IP or localhost, usually this is configurable
    private readonly TARGET_HOST = 'game-us.habbo.com'; 
    private readonly TARGET_PORT = 30000;

    constructor() {
        this.server = net.createServer(this.handleConnection.bind(this));
    }

    public start(): void {
        this.server.listen(this.LISTEN_PORT, () => {
            console.log(`[Nova-Packet] Proxy Listening on port ${this.LISTEN_PORT}`);
            console.log(`[Nova-Packet] Targeting ${this.TARGET_HOST}:${this.TARGET_PORT}`);
        });
    }

    private handleConnection(clientSocket: net.Socket): void {
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

    private closeSockets(client: net.Socket, server: net.Socket, source: string, err?: Error): void {
        if (err) console.error(`[${source} Error] ${err.message}`);
        
        if (!client.destroyed) client.destroy();
        if (!server.destroyed) server.destroy();
    }
}
