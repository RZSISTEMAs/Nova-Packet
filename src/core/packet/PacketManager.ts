import { Packet } from './Packet.js';

type PacketListener = (packet: Packet) => void;

export class PacketManager {
    private listeners: Map<number, PacketListener[]> = new Map();

    // Placeholder Heuristics for "Smart Sniffer"
    // In a real scenario, these would be dynamic or loaded from a config
    public static readonly HEADERS = {
        CHAT_CLIENT: 4000, 
        MOVE_CLIENT: 4001,
        CHAT_SERVER: 5000  
    };

    constructor() {}

    public handle(packet: Packet, direction: 'C->S' | 'S->C'): any {
        const header = packet.getHeader();
        let label = 'Unknown';
        let icon = '❓';

        // 1. Notify listeners (Internal Logic)
        if (this.listeners.has(header)) {
            this.listeners.get(header)?.forEach(cb => cb(packet));
        }

        // 2. Heuristic Labeling (Visuals for Frontend)
        // This is where we would guess based on length/structure if we don't know the header
        // For demo purposes, we return metadata
        return {
            header: header,
            length: packet.getBody().length,
            label: label,
            icon: icon
        };
    }

    public on(header: number, callback: PacketListener): void {
        if (!this.listeners.has(header)) {
            this.listeners.set(header, []);
        }
        this.listeners.get(header)?.push(callback);
    }
}
