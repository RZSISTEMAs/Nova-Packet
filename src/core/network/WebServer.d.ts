export declare class WebServer {
    private app;
    private server;
    private wss;
    private readonly PORT;
    constructor();
    private configureRoutes;
    private configureWebSocket;
    broadcastPacket(direction: string, packetData: string): void;
    start(): void;
}
//# sourceMappingURL=WebServer.d.ts.map