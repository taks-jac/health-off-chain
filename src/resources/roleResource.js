import ethers from 'ethers';
import ControlStructureGovern from '../contracts/dist/contracts/ControlStructureGovern.json';
import config from '../config/index.js';

class RoleResource {

  constructor(conf = {}) {
    this.conf = conf;
    const provider = this.configureProvider(conf);
    this.ControlStructureGovern = new ethers.Contract(conf.controlStructureAddress, ControlStructureGovern.abi, provider);
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  /**
   * Only owner
   * @param {*} new_member_address (address of new member))
   */
  async addMember(new_member_address) {
    const addMemberResult = await this.ControlStructureGovern.addMember(new_member_address, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  

  /**
   * Only owner
   * @param {*} old_member_address (address of new member))
   */
   async removeMember(old_member_address) {
    const revokeMemberResult = await this.ControlStructureGovern.removeMember(old_member_address, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }  

  /**  
   * @description: Request dao organization members
   */
   async getOrganizationMembers() {
    const org_members_request = await this.ControlStructureGovern.getOrganizationMembers( {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return org_members_request;
  }  

  /**  
   * @description: Get amount of members in dao organization
   */
   async numberOfMembers() {
    const org_members_count = await this.ControlStructureGovern.numberOfMembers( {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return org_members_count;
  }  

}

export default RoleResource;
