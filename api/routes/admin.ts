import { Router } from 'express';
import { getUsers, getTransactions, getLogs, updateTransactionStatus } from '../controllers/adminController';
import { authenticate } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';

const router = Router();

router.get('/users', authenticate, adminOnly, getUsers);
router.get('/transactions', authenticate, adminOnly, getTransactions);
router.get('/logs', authenticate, adminOnly, getLogs);
router.put('/transactions/:transactionId/status', authenticate, adminOnly, updateTransactionStatus);

export { router as adminRouter };