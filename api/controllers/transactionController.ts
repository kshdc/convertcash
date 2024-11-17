import { Request, Response, NextFunction } from 'express';
import { Transaction } from '../models/Transaction';
import { Log } from '../models/Log';
import { ApiError } from '../utils/ApiError';

interface TransactionRequest {
  codes: string;
  totalValue: number;
  finalAmount: number;
  paymentMethod: 'crypto' | 'paypal';
  receiverAddress: string;
  payment_type: 'PaySafeCard' | 'Transcash';
  cryptoType?: string;
}

export const getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new ApiError(401, 'User not authenticated');
    }

    const transactions = await Transaction.findAll({
      where: { username: req.user.username },
      order: [['payment_date', 'DESC']],
      attributes: [
        'id',
        'payment_type',
        'payment_date',
        'payment_status',
        'payment_value',
        'final_amount',
        'receiver_address',
        'payment_method',
        'crypto_type'
      ]
    });

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!req.user?.id) {
      throw new ApiError(401, 'User not authenticated');
    }

    const transaction = await Transaction.findOne({
      where: { 
        id,
        username: req.user.username
      }
    });

    if (!transaction) {
      throw new ApiError(404, 'Transaction not found');
    }

    await Log.create({
      action: 'TRANSACTION_DELETED',
      details: `Transaction ${id} deleted by user ${req.user.username}. Type: ${transaction.payment_type}, Amount: ${transaction.payment_value}€`,
      admin_username: req.user.username,
      timestamp: new Date()
    });

    await transaction.destroy();

    console.log('\x1b[33m%s\x1b[0m', `[${new Date().toISOString()}] Transaction ${id} deleted by user ${req.user.username}`);

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { 
      codes, 
      totalValue, 
      finalAmount, 
      paymentMethod, 
      receiverAddress, 
      payment_type,
      cryptoType 
    }: TransactionRequest = req.body;
    
    if (!codes) {
      throw new ApiError(400, 'No codes provided');
    }

    if (!totalValue || totalValue <= 0) {
      throw new ApiError(400, 'Invalid total value');
    }

    if (!finalAmount || finalAmount <= 0) {
      throw new ApiError(400, 'Invalid final amount');
    }

    if (!paymentMethod || !['crypto', 'paypal'].includes(paymentMethod)) {
      throw new ApiError(400, 'Invalid payment method');
    }

    if (!receiverAddress || receiverAddress.trim() === '') {
      throw new ApiError(400, 'Receiver address is required');
    }

    if (!payment_type || !['PaySafeCard', 'Transcash'].includes(payment_type)) {
      throw new ApiError(400, 'Invalid payment type');
    }

    if (paymentMethod === 'crypto' && !cryptoType) {
      throw new ApiError(400, 'Crypto type is required for crypto payments');
    }

    if (!req.user?.id || !req.user?.username) {
      throw new ApiError(401, 'User not authenticated');
    }

    const formattedCodes = codes
      .replace(/["\s-]/g, '') 
      .replace(/[^0-9,]/g, ''); 

    const transaction = await Transaction.create({
      user_id: req.user.id,
      username: req.user.username,
      payment_type,
      payment_codes: formattedCodes,
      payment_date: new Date(),
      payment_status: 'pending',
      payment_value: totalValue,
      final_amount: finalAmount,
      receiver_address: receiverAddress.trim(),
      payment_method: paymentMethod,
      crypto_type: cryptoType
    });

    await Log.create({
      action: 'TRANSACTION_CREATED',
      details: `New ${payment_type} transaction created by user ${req.user.username}. Amount: ${totalValue}€`,
      admin_username: req.user.username,
      timestamp: new Date()
    });

    console.log('\x1b[32m%s\x1b[0m', `[${new Date().toISOString()}] New ${payment_type} transaction created for user ${req.user.username}`);

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: {
        id: transaction.id,
        payment_type: transaction.payment_type,
        payment_date: transaction.payment_date,
        payment_status: transaction.payment_status,
        payment_value: transaction.payment_value,
        final_amount: transaction.final_amount,
        receiver_address: transaction.receiver_address,
        payment_method: transaction.payment_method,
        crypto_type: transaction.crypto_type
      }
    });
  } catch (error) {
    next(error);
  }
};