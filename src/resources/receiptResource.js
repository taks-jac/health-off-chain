import ethers from 'ethers';
import Result from '../contracts/dist/contracts/Result.json';
import config from '../config/index.js';

class ReceiptResource {

  constructor(conf = {}) {
    this.conf = conf;
    const provider = this.configureProvider(conf);
    this.Result = new ethers.Contract(conf.resultAddress, Result.abi, provider);
  }

  configureProvider(conf = {}) {
    return new ethers.Wallet(conf.controllerPrivateKey, new ethers.providers.JsonRpcProvider(conf.rpcUrl));
  }

  /**
   * Only person who have organization token and member role could vote
   * @param {*} targets (array of contract addresses related to execute functions from governor)
   * @param {*} values (array of values)
   * @param {*} calldatas (array of function with arguments related of contract addresses of first parameter)
   * @param {*} description (description of proposal)
   */
  async success_result(description) {
    const result = await this.Result.success_result(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description)), {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });  
  }

  async successInterfaceResult(description) {
    const encodeDescription = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description))
    const encodeCalldata = new ethers.utils.Interface(Result.abi).encodeFunctionData('success_result', [encodeDescription]); 
    return encodeCalldata;
  }

  async transferOwnership(contract_address) {
    const ownership = await this.Result.transferOwnership(contract_address, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return ownership
  }

  async get_results(description) {
    const hashDescription = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description))
    const requestResult = await this.Result.get_results(hashDescription, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return requestResult
  }
  
}

export default ReceiptResource;