import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export class PasswordUtils {
  static async hashPassword(password: string, salt: string): Promise<string> {
    const hash = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }

  static getPasswordSalt(password: string): string {
    return password.split('.')[0];
  }

  static generateSalt(): string {
    return randomBytes(16).toString('hex');
  }
}
