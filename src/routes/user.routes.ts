import { Router } from 'express';
import {profile, updateUser} from "../controllers/user.controller";
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/profile', authenticate, profile);
router.put('/:userId', authenticate, updateUser);

export default router;