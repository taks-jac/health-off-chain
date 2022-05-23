import { create } from 'ipfs-http-client'
import CID from 'cids'
import multihash from 'multihashes'

import config from '../config/index.js'; 

import HealthRoleResource from '../resources/roleResource.js';

class RolesController { 

  static async addDoctorRole(req, res, next) {
    try {   
      const file = req.files.file;
      const data = req.body;  
      const ipfs = await create();

      const upload_certificate = ipfs.add(file); 
      const url_profile = "ipfs.io/ipfs/"+ upload_certificate.cid
     
      const ipfs_doctor_profile = {"name": data.name, 
                                   "last_name":data.last_name,
                                   "description": data.description,
                                   "age":data.age,
                                   "country":data.country,
                                   "hospital":data.hospital,
                                   "certificate":url_profile};

      const jsonObj = JSON.stringify(ipfs_doctor_profile);      
      const profile_upload = ipfs.add(jsonObj) 

      const cid = new CID(profile_upload.cid).toJSON()
      const hash = multihash.decode(cid.hash)
      const result = "0x"+ multihash.toHexString(hash.digest)    

      const healthRoles = new HealthRoleResource({    
        controlStructureAddress: config.scHealthRoleaddress, 
        controllerPrivateKey: config.scAdminPrivateKey,
        rpcUrl: config.network.rpcUrl
      });  

      const addDoctorRole = await healthRoles.addDoctor(data.doctor_address,result);

      return res.status(200).json({ message: `Doctor profile register successfully.` });
    } catch (error) { 
      return next({ message: 'Issues trying register doctor profile.', status: 500 });
    }
  }  

  static async addUserRole(req, res, next) {
    try {   
      
      const data = req.body;  
      const ipfs = await create();     
     
      const ipfs_user_profile = {"name": data.name, 
                                   "last_name":data.last_name,
                                   "description": data.description,
                                   "age":data.age,
                                   "country":data.country,
                                   "country_id":data.country_id,
                                   "cellphone":data.cellphone,
                                   "email":data.email};

      const jsonObj = JSON.stringify(ipfs_user_profile);      
      const profile_upload = ipfs.add(jsonObj) 

      const cid = new CID(profile_upload.cid).toJSON()
      const hash = multihash.decode(cid.hash)
      const result = "0x"+ multihash.toHexString(hash.digest)    

      const healthRoles = new HealthRoleResource({    
        controlStructureAddress: config.scHealthRoleaddress, 
        controllerPrivateKey: config.scAdminPrivateKey,
        rpcUrl: config.network.rpcUrl
      });  

      const addUserRole = await healthRoles.addUser(data.user_address,result);

      return res.status(200).json({ message: `User profile register successfully.` });
    } catch (error) { 
      return next({ message: 'Issues trying register user profile.', status: 500 });
    }
  }  
}
export default RolesController;
