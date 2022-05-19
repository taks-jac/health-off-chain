import ethers from 'ethers';
import HealthStructure from '../smart_contract/dist/HealthControl.json';
import config from '../config/index.js';

class HealthRoleResource {

  constructor(conf = {}) {
    this.conf = conf;
    const provider = this.configureProvider(conf);
    this.HealthStructure = new ethers.Contract(conf.controlStructureAddress, HealthStructure.abi, provider);
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  /**
   * Only admin
   * @param {*} doctor_address (address of new doctor)
   * @param {*} cid_profile (CID IPFS profile of doctor)
   */
  async addDoctor(doctor_address,cid_profile) {
    const addDoctorResult = await this.HealthStructure.addDoctor(doctor_address, cid_profile ,{
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  

  /**
   * Only admin
   * @param {*} user_address (address of new user)
   * @param {*} cid_profile (CID IPFS profile of user)
   */
   async addUser(user_address,cid_profile) {
    const addUserResult = await this.HealthStructure.addDoctor(user_address,cid_profile, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  

  
}

export default HealthRoleResource;
