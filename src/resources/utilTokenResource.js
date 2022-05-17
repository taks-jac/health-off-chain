import ethers from 'ethers';
import AGROSTestToken from '../contracts/dist/contracts/AGROSTestToken.json';
import config from '../config/index.js';

class UtilTokenResource {

  constructor(conf = {}) {
    this.conf = conf;
    const provider = this.configureProvider(conf);
    this.AGROSTestToken = new ethers.Contract(conf.utilTokenAddress, AGROSTestToken.abi, provider);
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  /**
   * Only agros admin
   * @param {*} account (address of user who want to transfer util token))) 
   * @param {*} amount (amount of util token to transfer))
   */
  async transfer(account, amount) {
    const transferResult = await this.AGROSTestToken.transfer(account, amount, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  

  /**
   * Any user
   * @param {*} contract_address (address of the contract whose manage util tokens of user)
   * @param {*} amount (amount of util token to approve)
   */
   async approve(contract_address, amount) {
    const approveResult = await this.AGROSTestToken.approve(contract_address, amount, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  

  /**
   * Any user
   * @param {*} account (address of user to request util token balance)
   */
   async balanceOf(account) {
    const balanceOfResult = await this.AGROSTestToken.balanceOf(account, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return balanceOfResult;
  }  

}

export default UtilTokenResource;
