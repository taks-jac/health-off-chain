import { create } from 'ipfs-http-client'
import CID from 'cids'
import multihash from 'multihashes'

import config from '../config/index.js'; 

import Cryptography from '../utils/cryptography.js';
import HealthStoreResource from '../resources/storeResource';

class StoreController { 

  static async approveHistoryUser(req, res, next) {
    try {  
      const data = req.body

      const healthStore = new HealthStoreResource({    
        controlStructureAddress: config.agrosTokenContractAddress, 
        controllerPrivateKey: data.user_private_key,
        rpcUrl: config.network.rpcUrl
      });  

      const approveHistoryUser = await healthStore.approveUser(data.approved_user);

      return res.status(200).json({ message: `User approved successfully.` });
    } catch (error) { 
      return next({ message: 'Issues trying approve user.', status: 500 });
    }
  }  

  static async addMedicalHistory(req, res, next) {
    try {   
      
      const data = req.body;  
      const ipfs = await create();    
      const crypto = new Cryptography(); 
      

      const healthStore = new HealthStoreResource({    
        controlStructureAddress: config.agroStructureContractAddress, 
        controllerPrivateKey: data.doctor_private_key,
        rpcUrl: config.network.rpcUrl
      });  

      const request_history = await healthStore.viewHistorial(data.user_address);
      if (request_history[0] == config.not_history ){
        const user_folder = crypto.encrypt(data.user_address)+'.json'

      }
      


     
        const ipfs_user_profile = {"name": data.name, 
                                    "last_name":data.last_name,
                                    "description": data.description,
                                    "age":data.age,
                                    "country":data.country,
                                    "country_id":data.country_id};

        const jsonObj = JSON.stringify(ipfs_user_profile);      
        const profile_upload = ipfs.add(jsonObj) 

        const cid = new CID(profile_upload.cid).toJSON()
        const hash = multihash.decode(cid.hash)
        const result = "0x"+ multihash.toHexString(hash.digest)    

        const addUserRole = await healthStore.addHistorial(data.user_address,cid_data);

      return res.status(200).json({ message: `User profile register successfully.` });
    } catch (error) { 
      return next({ message: 'Issues trying register user profile.', status: 500 });
    }
  }  

  static async viewMedicalHistory(req, res, next) {
    try {   
      
      const data = req.body;  
      const ipfs = await IPFS.create();     
     
      const ipfs_user_profile = {"name": data.name, 
                                   "last_name":data.last_name,
                                   "description": data.description,
                                   "age":data.age,
                                   "country":data.country,
                                   "country_id":data.country_id};

      const jsonObj = JSON.stringify(ipfs_user_profile);      
      const profile_upload = ipfs.add(jsonObj) 

      const cid = new CID(profile_upload.cid).toJSON()
      const hash = multihash.decode(cid.hash)
      const result = "0x"+ multihash.toHexString(hash.digest)    

      const healthRoles = new HealthRoleResource({    
        controlStructureAddress: config.agroStructureContractAddress, 
        controllerPrivateKey: crypto.decrypt(config.agrosAdminPrivateKey),
        rpcUrl: config.network.rpcUrl
      });  

      const addUserRole = await healthRoles.addUser(data.user_address,result);

      return res.status(200).json({ message: `User profile register successfully.` });
    } catch (error) { 
      return next({ message: 'Issues trying register user profile.', status: 500 });
    }
  } 
}
export default StoreController;
