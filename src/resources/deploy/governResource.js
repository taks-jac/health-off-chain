import ethers from 'ethers';
import AgrosGovern from '../../contracts/dist/contracts/AgrosGovern.json';

class AgrosGovernOrgResource {
  
   /**
   * Only organization wallet address could do this deploy
   * @description - This deploy is to register a new governor system related of an organization   * 
   */  
  constructor(conf = {}) {
    const provider = this.configureProvider(conf);    
    this.AgrosGovern = new ethers.ContractFactory(AgrosGovern.abi, AgrosGovern.bytecode, provider);
    
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  async deployGovern(utilTokenAddress, 
                     structureAddress,   
                     tokenAddress,                  
                     quorumPercentage, 
                     votingPeriod, 
                     votingDelay){
    const contract = await this.AgrosGovern.deploy(utilTokenAddress, 
                                                   structureAddress,
                                                   tokenAddress,
                                                   quorumPercentage,
                                                   votingPeriod,
                                                   votingDelay,
                                                   0);
    return contract;
  }

}

export default AgrosGovernOrgResource;