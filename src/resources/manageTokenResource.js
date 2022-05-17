import ethers from 'ethers';
import TokenGovern from '../contracts/dist/contracts/TokenGovern.json';
import config from '../config/index.js';

class ManageTokenResource {

  constructor(conf = {}) {
    this.conf = conf;
    const provider = this.configureProvider(conf);
    this.TokenGovern = new ethers.Contract(conf.tokenAddress, TokenGovern.abi, provider);
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  /**
   * Only owner
   * @param {*} account (address of the person who want to mint token))) 
   * @param {*} amount (amount of token to mint))
   */
  async mint(account, amount) {
    const mintResult = await this.TokenGovern.mint(account, amount, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  

  /**
   * Only owner
   * @param {*} account (address of the person who want to mint token))) 
   * @param {*} amount (amount of token to mint))
   */
  async burn(account, amount) {
    const burnResult = await this.TokenGovern.burn(account, amount, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }

  /**
   * Only owner
   * @param {*} account (address of the person who want to mint token))) 
   */
  async balanceOf(account) {
    const balance = await this.TokenGovern.balanceOf(account, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return balance;
  }  

  /**
   * Only account owner
   * @param {*} account (address of the person who will delegate. Could be yourself or other for vote.)) 
   */
  async delegate(account) {
    const delegate = await this.TokenGovern.delegate(account, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  
  
}

export default ManageTokenResource;
