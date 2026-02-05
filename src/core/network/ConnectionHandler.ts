import * as net from 'net';
import { Packet } from '../packet/Packet';

export class ConnectionHandler {
    private server: net.Server;
    private readonly PORT = 9090; // Standard intercept port

    constructor() {
        this.server = net.createServer(this.handleConnection.bind(this));
    }

    public start(): void {
        this.server.listen(this.PORT, () => {
            console.log(`[Nova-Packet] Listening on port ${this.PORT}`);
        });
    }

    private handleConnection(clientSocket: net.Socket): void {
        console.log('[Nova-Packet] New Client Connected');

        // Logic to connect to the actual game server would go here
        // For now, just echoing data
        
        clientSocket.on('data', (data) => {
            console.log(`[Received] ${data.length} bytes`);
            const packet = Packet.fromBuffer(data);
            console.log(`[Parsed] ${packet.toString()}`);
        });

        clientSocket.on('end', () => {
            console.log('[Nova-Packet] Client Disconnected');
        });

        clientSocket.on('error', (err) => {
            console.error(`[Error] ${err.message}`);
        });
    }
}
