import { Router } from 'express';
import { register, login, refreshToken } from '../controllers/authController';
import { validateRegistration, validateLogin } from '../middleware/validation';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', authenticate, refreshToken);

export { router as authRouter };