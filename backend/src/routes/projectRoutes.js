import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {
  requireTenantUser,
  requireTenantAdmin,
} from '../middlewares/roleMiddleware.js';


import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', authenticate, requireTenantUser, getProjects);
router.post('/', authenticate, requireTenantAdmin, createProject);
router.put('/:id', authenticate, requireTenantAdmin, updateProject);
router.delete('/:id', authenticate, requireTenantAdmin, deleteProject);

export default router;
