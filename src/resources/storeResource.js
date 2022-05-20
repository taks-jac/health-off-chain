import ethers from 'ethers';
import HealthStore from '../smart_contract/dist/HealthStore.json';
import config from '../config/index.js';

class HealthStoreResource {

  constructor(conf = {}) {
    this.conf = conf;
    const provider = this.configureProvider(conf);
    this.HealthStore = new ethers.Contract(conf.controlStructureAddress, HealthStore.abi, provider);
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  /**
   * Only admin
   * @param {*} user_address (address of new doctor)
   * @param {*} cid_history (CID IPFS profile of doctor)
   */
  async addHistorial(user_address,cid_history) {
    const addHistorialResult = await this.HealthStructure.addHistorial(user_address, cid_history ,{
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  

  /**
   * Only admin
   * @param {*} doctor_address (address of doctor to approve)
   */
   async approveUser(doctor_address) {
    const approveUserResult = await this.HealthStructure.approveUser(doctor_address, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  

  /**
   * Only admin
   * @param {*} user_address (address of user to view history)
   */
   async viewHistorial(user_address) {
    const viewHistoryResult = await this.HealthStructure.viewHistorial(user_address, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return viewHistoryResult
  }  

  
}

export default HealthStoreResource;
