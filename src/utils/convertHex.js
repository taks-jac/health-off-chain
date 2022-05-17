import ethers from 'ethers';

export default function convertHex(hex) {
  let hex_number = ethers.BigNumber.from(ethers.utils.hexValue(hex));
  return hex_number.toString();
}
  