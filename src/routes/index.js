import express from 'express';

import RolesController from '../controllers/rolesController.js';



const router = express.Router();

// Role functions
router.post('/roles/doctor', 
            RolesController.addDoctorRole);
router.post('/roles/user', 
            RolesController.addUserRole);

export default router;

