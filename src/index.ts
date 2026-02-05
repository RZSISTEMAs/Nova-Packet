import { ConnectionHandler } from './core/network/ConnectionHandler';
import { WebServer } from './core/network/WebServer';

console.log('Nova-Packet Core Initializing...');

const webServer = new WebServer();
webServer.start();

const network = new ConnectionHandler(webServer);
network.start();
