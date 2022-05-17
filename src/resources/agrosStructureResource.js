import ethers from 'ethers';
import ControlStructure from '../contracts/dist/contracts/ControlStructure.json';
import config from '../config/index.js';

class AgrosStructureResource {

  constructor(conf = {}) {
    this.conf = conf;
    const provider = this.configureProvider(conf);
    this.ControlStructure = new ethers.Contract(conf.agrosStructureAddress, ControlStructure.abi, provider);
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  /**
   * Only agros admin
   * @param {*} account (address of organization)
   */
  async addOrganization(account) {
    const addOrganizationResult = await this.ControlStructure.addOrganization(account,{
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }    

  /**
   * Only agros organization
   * @param {*} account (address of producer)
   */
   async addFarmer(account) {
    const addFarmerResult = await this.ControlStructure.addFarmer(account, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }   

  /**
   * Only admin
   * @param {*} account (address of contract whose manage util tokens of user)
   */
   async addMarketplace(account) {
    const addMarketplaceResult = await this.ControlStructure.addMarketplace(account, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }   

}

export default AgrosStructureResource;
