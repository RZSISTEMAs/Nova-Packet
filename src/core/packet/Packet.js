"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packet = void 0;
/**
 * Represents a Habbo Packet.
 * Can be parsed from a buffer or constructed from a header and body.
 */
class Packet {
    header;
    body;
    constructor(header, body) {
        this.header = header;
        this.body = body;
    }
    /**
     * Creates a packet from a raw buffer.
     * Note: This is a placeholder implementation.
     * Actual Habbo packet parsing logic (length, header decoding) will be needed here.
     */
    static fromBuffer(buffer) {
        // TODO: Implement actual parsing logic (Length + Header + Body)
        // For now, assuming raw string for demo purposes
        return new Packet("UNKNOWN", buffer);
    }
    toString() {
        return `[${this.header}] ${this.body.toString("utf-8")}`; // Careful with binary data
    }
}
exports.Packet = Packet;
//# sourceMappingURL=Packet.js.map