import ethers from 'ethers';
import TokenGovern from '../../contracts/dist/contracts/TokenGovern.json';

class TokenOrgResource {
  
   /**
   * Only organization wallet address could do this deploy
   * @description - This deploy is to register a new token related of an organization   * 
   */  
  constructor(conf = {}) {
    const provider = this.configureProvider(conf);    
    this.TokenGovern = new ethers.ContractFactory(TokenGovern.abi, TokenGovern.bytecode, provider);

  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  async deployToken(orgName,orgSymbol){
    const contract = await this.TokenGovern.deploy(orgName, orgSymbol);
    return contract;
  }

}

export default TokenOrgResource;
