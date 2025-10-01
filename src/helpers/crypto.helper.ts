import crypto from 'node:crypto';

export class CryptoHelper {
  randomUUID(): string {
    return crypto.randomUUID();
  }

  randomSecretKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  createHash(text: string, salt: string): Buffer {
    const buffer: Buffer = Buffer.from(`${text}${salt}`, 'utf-8');
    return crypto.createHash('sha512').update(buffer).digest();
  }

  compareHash(hash: Buffer, text: string, salt: string): boolean {
    return (
      hash.toString('base64') === this.createHash(text, salt).toString('base64')
    );
  }
}
