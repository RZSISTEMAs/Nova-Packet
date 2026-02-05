/**
 * Represents a Habbo Packet.
 * Can be parsed from a buffer or constructed from a header and body.
 */
export declare class Packet {
    private header;
    private body;
    constructor(header: string, body: Buffer);
    /**
     * Creates a packet from a raw buffer.
     * Note: This is a placeholder implementation.
     * Actual Habbo packet parsing logic (length, header decoding) will be needed here.
     */
    static fromBuffer(buffer: Buffer): Packet;
    toString(): string;
}
//# sourceMappingURL=Packet.d.ts.map