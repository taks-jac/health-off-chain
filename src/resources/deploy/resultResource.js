import ethers from 'ethers';
import Result from '../../contracts/dist/contracts/Result.json';

class ResultOrgResource {
  
   /**
   * Only organization wallet address could do this deploy
   * @description - This deploy is to register a new receipt result related of an organization   * 
   */  
  constructor(conf = {}) {
    const provider = this.configureProvider(conf);    
    this.Result = new ethers.ContractFactory(Result.abi, Result.bytecode, provider);
   
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  async deployResult(orgName,orgSymbol){
    const contract = await this.Result.deploy();
    return contract;
  }

}

export default ResultOrgResource;