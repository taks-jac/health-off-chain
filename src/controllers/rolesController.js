import Cryptography from '../utils/cryptography.js';
import IPFS from 'ipfs-http-client';
import all from 'it-all';

import HealthRoleResource from '../resources/roleResource.js';

class RolesController { 

  static async addDoctorRole(req, res, next) {
    try {   
      const data = req.body;  
      const ipfs = await IPFS.create();

      const metaObj = {"name": data.name, 
                       "description": data.description};
      const jsonObj = JSON.stringify(metaObj);

      
      const profile_upload = ipfs.add(jsonObj) 

      return res.status(200).json({ message: `Proposal creation successfully.` });
    } catch (error) { 
      return next({ message: 'Problemas al crear propuesta. Verificar si la propuesta ya existe.', status: 500 });
    }
  } 

 
}
export default RolesController;
