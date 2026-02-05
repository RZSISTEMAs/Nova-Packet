/**
 * Represents a Habbo Packet.
 * Can be parsed from a buffer or constructed from a header and body.
 */
export class Packet {
  private header: string;
  private body: Buffer;

  constructor(header: string, body: Buffer) {
    this.header = header;
    this.body = body;
  }

  /**
   * Creates a packet from a raw buffer.
   * Note: This is a placeholder implementation.
   * Actual Habbo packet parsing logic (length, header decoding) will be needed here.
   */
  static fromBuffer(buffer: Buffer): Packet {
    // TODO: Implement actual parsing logic (Length + Header + Body)
    // For now, assuming raw string for demo purposes
    return new Packet("UNKNOWN", buffer);
  }

  toString(): string {
    return `[${this.header}] ${this.body.toString("utf-8")}`; // Careful with binary data
  }
}
