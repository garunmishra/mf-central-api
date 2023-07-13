const CryptoJS = require('crypto-js');

class CryptUtils {
  static TRANSFORMATION = 'AES/CBC/PKCS5Padding';
  static ALGORITHM = 'AES';
  static DIGEST = 'SHA-256';

  static iv = CryptoJS.enc.Utf8.parse('globalaesvectors');

  static encryptDecrypt(Mode, cryptText, passKey) {
    let retText = '';
    try {
      const hash = CryptoJS.SHA256(passKey).toString();
      const password = CryptoJS.enc.Utf8.parse(hash.substring(0, 32));

      let result;
      if (Mode === 'ENCRYPT') {
        const ciphertext = CryptoJS.AES.encrypt(cryptText, password, {
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        result = ciphertext.toString();
        result = result.replace(/\+/g, '-').replace(/\//g, '_');
      } else {
        cryptText = cryptText.replace(/-/g, '+').replace(/_/g, '/');
        const bytes = CryptoJS.AES.decrypt(cryptText, password, {
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        result = bytes.toString(CryptoJS.enc.Utf8);
      }

      retText = result;
    } catch (error) {
      throw new Error('Encryption error: ' + error.toString());
    }
    return retText;
  }

}



module.exports = CryptUtils;
