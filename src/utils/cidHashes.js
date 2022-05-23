import CID from 'cids'
import { hexDataSlice } from 'ethers/lib/utils'
import multihash from 'multihashes'

class CIDResource {
  getHash(cidData) { 
    const cid = new CID(cidData).toJSON()
    const result = multihash.decode(cid.hash)
    const hash = '0x'+multihash.toHexString(result.digest)

    return hash
  }

  getCID(hashData) {
    const hash = multihash.fromHexString(hashData.slice(2))
    const result_str = multihash.encode(hash,'sha2-256')
    const cid = multihash.toB58String(result_str)
    return cid
  }
}

export default CIDResource;




