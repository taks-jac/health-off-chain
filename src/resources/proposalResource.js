import ethers from 'ethers';
import AgrosGovern from '../contracts/dist/contracts/AgrosGovern.json';
import config from '../config/index.js';

class ProposalResource {

  constructor(conf = {}) {
    this.conf = conf;
    const provider = this.configureProvider(conf);
    this.AgrosGovern = new ethers.Contract(conf.governAddress, AgrosGovern.abi, provider);
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
  async propose(targets, values, calldatas, description) {
    const proposeResult = await this.AgrosGovern.propose([targets], [values], [calldatas], description, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    const receipt = await proposeResult.wait();
    return receipt.events[2].args.proposalId;
  }

  /**
   * Only person who have organization token could vote
   * @param {*} proposalId (id of active proposal)
   * @param {*} vote (vote decision of person, only could be an index to "for", "against" or "abstain")
   */
  async castVote(proposalId, vote) {
    const castVoteResult = await this.AgrosGovern.castVote(proposalId, vote, {
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
  }

  /**
     * Only person who have organization token could vote
     * @param {*} proposalId (id of active proposal)
     * @param {*} vote (vote decision of person, only could be an index to "for", "against" or "abstain")
     */
  async castVoteWithReason(proposalId, vote, reason) {
    const castVoteWithReasonResult = await this.AgrosGovern.castVoteWithReason(proposalId, vote, reason,{
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return castVoteWithReasonResult;
}

  /**
   * Only person who have organization token could vote
   * @param {*} proposalId (id of active proposal)
   */
  async proposalVotes(proposalId) {
    const proposalVotesResult = await this.AgrosGovern.proposalVotes(proposalId ,{
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return proposalVotesResult
  }

  /**
   * Only person who have organization token and member role could vote
   * @param {*} targets (array of contract addresses related to execute functions from governor)
   * @param {*} values (array of values)
   * @param {*} calldatas (array of function with arguments related of contract addresses of first parameter)
   * @param {*} description (description of proposal)
   */
  async execute(targets, values, calldatas, description) { 
    const encodeDescription = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description));  
    const executeResult = await this.AgrosGovern.execute([targets],[values], [calldatas],encodeDescription, {
      gasLimit: 5000000,
      gasPrice: config.price_setting
    });   
    return executeResult;
    
  }

  /**
   * Only person who have organization token could vote
   * @param {*} proposalId (id of active proposal)
   */
  async state(proposalId) {
    const stateResult = await this.AgrosGovern.state(proposalId ,{
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return stateResult
  }

  /**
   * Any user could request
   * @param {*} proposalId (id of active proposal)
   * @param {*} account (account of user vote requested)
   */
   async hasVoted(proposalId,account) {
    const hasVotedResult = await this.AgrosGovern.hasVoted(proposalId, account,{
      gasLimit: 1000000,
      gasPrice: config.price_setting
    });
    return hasVotedResult
  }

  
}

export default ProposalResource;
