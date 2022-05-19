import Cryptography from '../utils/cryptography.js';


class RolesController { 

  static async addDoctorRole(req, res, next) {
    try {    

      const data = req.body;  
      const crypto = new Cryptography();      

      return res.status(200).json({ message: `Proposal creation successfully.` });
    } catch (error) { 
      return next({ message: 'Problemas al crear propuesta. Verificar si la propuesta ya existe.', status: 500 });
    }
  } 

 
}
export default RolesController;
