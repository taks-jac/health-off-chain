import Fernet from 'fernet';
import config from '../config/index.js';

class Cryptography {
  constructor() {
    this.secret = new Fernet.Secret(config.hash_key);
  }

  encrypt(data) {
    const token = new Fernet.Token({
      secret: this.secret
    });
    return token.encode(data);
  }

  decrypt(data) {
    const token = new Fernet.Token({
      secret: this.secret,
      token: data,
      ttl: 0
    });
    return token.decode();
  }
}

export default Cryptography;
