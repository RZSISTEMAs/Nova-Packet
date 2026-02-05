import { ConnectionHandler } from './core/network/ConnectionHandler';

console.log('Nova-Packet Core Initializing...');

const network = new ConnectionHandler();
network.start();
