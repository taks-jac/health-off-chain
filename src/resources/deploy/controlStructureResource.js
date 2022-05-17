import ethers from 'ethers';
import ControlStructureGovern from '../../contracts/dist/contracts/ControlStructureGovern.json';

class ControlStructureOrgResource {
  
   /**
   * Only organization wallet address could do this deploy
   * @description - This deploy is to register a control structure role related of an organization   * 
   */  
  constructor(conf = {}) {
    const provider = this.configureProvider(conf);    
    this.ControlStructureGovern = new ethers.ContractFactory(ControlStructureGovern.abi, ControlStructureGovern.bytecode, provider);
   
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  async deployStructure(orgMembers){
    const contract = await this.ControlStructureGovern.deploy(orgMembers);
    return contract;
  }

}

export default ControlStructureOrgResource;