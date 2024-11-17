import { Router } from 'express';
import { createTransaction, getTransactions, deleteTransaction } from '../controllers/transactionController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createTransaction);
router.get('/', authenticate, getTransactions);
router.delete('/:id', authenticate, deleteTransaction);

export { router as transactionRouter };