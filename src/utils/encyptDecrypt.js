const crypto = require('crypto');
const axios = require('axios');

const TRANSFORMATION = 'aes-256-cbc';
const ALGORITHM = 'aes-256-cbc';
const DIGEST = 'sha256';

function encryptDecrypt(mode, cryptText, passKey) {
  let retText = '';
  try {
    const hash = crypto.createHash(DIGEST);
    const bytehash = hash.update(passKey, 'utf8').digest();

    let strHash = '';
    const formatter = new Formatter();
    for (const myByte of bytehash) {
      strHash = '';
      strHash = myByte.toString(16).padStart(2, '0');
      formatter.format(strHash);
    }
    strHash = formatter.toString();

    if (strHash.length > 32) {
      strHash = strHash.substring(0, 32);
    }

    const bytekeytemp = Buffer.from(strHash, 'utf8');
    const bytekey = Buffer.alloc(32);
    bytekeytemp.copy(bytekey, 0, 0, 32);

    const password = Buffer.from(bytekey);

    const cipher = crypto.createCipheriv(TRANSFORMATION, password, iv);
    const decipher = crypto.createDecipheriv(TRANSFORMATION, password, iv);

    let encryptedVal;
    if (mode === 'ENCRYPT') {
      const ciphertext = Buffer.concat([cipher.update(cryptText, 'utf8'), cipher.final()]);
      const encodedValue = ciphertext.toString('base64');
      encryptedVal = encodedValue.replace('+', '-').replace('/', '_');
      retText = encryptedVal;
    } else {
      const decodedValue = Buffer.from(cryptText, 'base64');
      const decryptedVal = Buffer.concat([decipher.update(decodedValue), decipher.final()]);
      retText = decryptedVal.toString('utf8');
    }
  } catch (error) {
    console.log('Encryption error:', error);
  }
  return retText;
}