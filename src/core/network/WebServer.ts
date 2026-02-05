import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import * as http from 'http';
import * as path from 'path';

export class WebServer {
    private app: express.Express;
    private server: http.Server;
    private wss: WebSocketServer;
    private readonly PORT = 3000;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocketServer({ server: this.server });

        this.configureRoutes();
        this.configureWebSocket();
    }

    private configureRoutes(): void {
        // Serve static files from 'public' directory
        this.app.use(express.static(path.join(__dirname, '../../public')));
        
        // Default route
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../public/index.html'));
        });
    }

    private configureWebSocket(): void {
        this.wss.on('connection', (ws: WebSocket) => {
            console.log('[WebServer] Frontend Client Connected');
            
            ws.on('close', () => {
                console.log('[WebServer] Frontend Client Disconnected');
            });
        });
    }

    public broadcastPacket(direction: string, packetData: string): void {
        const message = JSON.stringify({
            timestamp: new Date().toLocaleTimeString(),
            direction: direction,
            data: packetData
        });

        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    public start(): void {
        this.server.listen(this.PORT, () => {
            console.log(`[Nova-Packet] Web Interface running at http://localhost:${this.PORT}`);
        });
    }
}
