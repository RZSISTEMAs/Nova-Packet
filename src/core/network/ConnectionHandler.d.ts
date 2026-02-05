export declare class ConnectionHandler {
    private server;
    private readonly LISTEN_PORT;
    private readonly TARGET_HOST;
    private readonly TARGET_PORT;
    private webServer?;
    constructor(webServer?: any);
    start(): void;
    private handleConnection;
    private closeSockets;
}
//# sourceMappingURL=ConnectionHandler.d.ts.map