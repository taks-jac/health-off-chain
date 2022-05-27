import { create } from 'ipfs-http-client'
import config from '../config/index.js'; 

import Cryptography from '../utils/cryptography.js';
import CIDResource from '../utils/cidHashes.js'

import HealthStoreResource from '../resources/storeResource';

class StoreController { 

  static async approveHistoryUser(req, res, next) {
    try {  
      const data = req.body

      const healthStore = new HealthStoreResource({    
        controlStructureAddress: config.scHealthStoreaddress, 
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
      const hashes = new CIDResource();     

      const healthStore = new HealthStoreResource({    
        controlStructureAddress: config.scHealthStoreaddress, 
        controllerPrivateKey: data.doctor_private_key,
        rpcUrl: config.network.rpcUrl
      });  

      const request_history = await healthStore.viewHistorial(data.user_address);

      const cid_files = [];
      const name_files = [];

      _.forEach(_.keysIn(req.files.files), (i) => {
        let file = req.files.files[i];
        const upload_data = await ipfs.add(file); 
        const url_profile = "ipfs.io/ipfs/"+ upload_data.cid
        cid_files.push(url_profile);     
        name_files.push(`${file.name}+${file.mimetype}`); 

        });
      
      const ipfs_file = {"analysis_name": data.analysis_name, 
                         "consultation_date": Date.now(),
                         "medical_center_name": data.medical_center_name,                     
                         "country":data.country,
                         "city": data.city,
                         "hospital": data.hospital,
                         "files_attach_link": cid_files,
                         "files_attach_name": name_files,
                         "classification":data.classification};    
      const jsonObj = JSON.stringify(ipfs_file);    
                          
      const user_folder =  crypto.encrypt(data.user_address);
      if (request_history[0] == config.not_history ){        
        const create_mkdir = await ipfs.files.mkdir(user_folder, { parents: true })     
      }
      
      const upload_files = await ipfs.files.write(`${user_folder}/${ipfs_file.analysis_name}.json`,jsonObj, { create: true })

      const ipfs_user_folder = await ipfs.files.stat(user_folder)
      const hash_folder = await hashes.getHash(ipfs_user_folder.cid)       

      const addHistory = await healthStore.addHistorial(data.user_address,hash_folder);

      return res.status(200).json({ message: `User data upload to IPFS successfully.` });
    } catch (error) { 
      return next({ message: 'Issues trying upload user data.', status: 500 });
    }
  }  

  static async viewMedicalHistory(req, res, next) {
    try {   
      
      const data = req.body;  
      const hashes = new CIDResource();     
      const ipfs = await create();         
     

      const healthStore = new HealthStoreResource({    
        controlStructureAddress: config.scHealthStoreaddress, 
        controllerPrivateKey: data.doctor_private_key,
        rpcUrl: config.network.rpcUrl
      });  

      const viewHistory = await healthStore.viewHistorial(data.user_address);
      const cid_folder = hashes.getCID(viewHistory[0]);
      const list_file = [];
      for await (const file of ipfs.ls(cid_folder)) {
        const file_content = await ipfs.files.read(file.path);
        list_file.push(file_content);
      }

      return res.status(200).json({ message: `Request user data history successfully.`,data : list_file });
    } catch (error) { 
      return next({ message: 'Issues trying view user data history.', status: 500 });
    }
  } 
}
export default StoreController;
