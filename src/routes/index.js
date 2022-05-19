import express from 'express';

import RolesController from '../controllers/rolesController.js';



const router = express.Router();

// Proposal functions
router.post('/roles', 
            RolesController.addDoctorRole);

export default router;

