export class Packet {
    private header: number;
    private body: Buffer;
    private length: number;

    constructor(header: number, body: Buffer) {
        this.header = header;
        this.body = body;
        this.length = body.length + 2; // +2 for header
    }

    /**
     * Reads a packet from the buffer.
     * Returns null if buffer is incomplete.
     */
    static fromBuffer(buffer: Buffer): Packet | null {
        if (buffer.length < 4) return null;

        // Read Packet Length (4 bytes int32)
        const length = buffer.readInt32BE(0);

        // Check if we have the full packet (Length bytes + 4 bytes for the length integer itself)
        if (buffer.length < 4 + length) return null;

        // Header is the first 2 bytes of the body (short)
        const header = buffer.readInt16BE(4);

        // Body is the rest
        const body = buffer.subarray(6, 4 + length);

        return new Packet(header, body);
    }

    /**
     * Decodes basic primitive types from the body.
     * This is a simple sequential reader.
     */
    public readString(): string {
        try {
            const length = this.body.readUInt16BE(0);
            const str = this.body.toString('utf-8', 2, 2 + length);
            this.body = this.body.subarray(2 + length); // Advance buffer
            return str;
        } catch (e) {
            return "";
        }
    }

    public readInt(): number {
        try {
            const val = this.body.readInt32BE(0);
            this.body = this.body.subarray(4);
            return val;
        } catch (e) {
            return 0;
        }
    }

    public getHeader(): number {
        return this.header;
    }

    public getBody(): Buffer {
        return this.body;
    }

    public toString(): string {
        return `[${this.header}] Len:${this.length}`;
    }
}
