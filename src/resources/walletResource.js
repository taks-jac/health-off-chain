import { WalletsChainRepository } from '../repositories/index.js';
import Cryptography from '../utils/cryptography.js';
import HttpError from '../core/errors/HttpError.js';

class WalletResource {
  static async getWallet(wallet_id, chain_id, chain_service_id) {
    const crypto = new Cryptography();
    const wallet = await new WalletsChainRepository().findOne({ wallet_id, chain_id, chain_service_id, disabled_at: null });    
    if (!wallet) throw new HttpError('No existe la billetera.', 404);
    return {
      id: wallet.id,
      address: crypto.decrypt(wallet.wallet_service),
      privateKey: crypto.decrypt(wallet.wallet_service_secret)
    };
  }
}

export default WalletResource;
