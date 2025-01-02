'use client';

import { ENCRYPTION_KEY } from 'config';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto
  .createHash('sha256')
  .update(String(ENCRYPTION_KEY))
  .digest('base64')
  .slice(0, 32);
const ivLength = 16;

const encrypt = (password: string): string => {
  try {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    return password;
  }
};

const decrypt = (encryptedPassword: string): string => {
  try {
    if (!encryptedPassword.includes(':')) {
      return encryptedPassword;
    }

    const [ivString, encrypted] = encryptedPassword.split(':');

    if (!ivString || !encrypted) {
      throw new Error('Invalid encrypted data format');
    }

    if (ivString.length !== ivLength * 2) {
      throw new Error('Invalid IV length');
    }

    const iv = Buffer.from(ivString, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedPassword;
  }
};

export { decrypt, encrypt };
