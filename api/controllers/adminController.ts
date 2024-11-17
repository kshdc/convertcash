import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { Transaction } from '../models/Transaction';
import { ApiError } from '../utils/ApiError';
import { Log } from '../models/Log';

interface RankThreshold {
  xp: number;
  name: string;
}

const rankThresholds: RankThreshold[] = [
  { xp: 0, name: 'aucun' },
  { xp: 100, name: 'bronze' },
  { xp: 300, name: 'silver' },
  { xp: 500, name: 'gold' },
  { xp: 1000, name: 'platinum' },
  { xp: 2000, name: 'diamond' }
];

const calculateNewRank = (xp: number): string => {
  let newRank = 'aucun';
  for (const threshold of rankThresholds) {
    if (xp >= threshold.xp) {
      newRank = threshold.name;
    } else {
      break;
    }
  }
  return newRank;
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'mail', 'rank', 'adresse_ip', 'xp'],
      order: [['id', 'DESC']]
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const logs = await Log.findAll({
      order: [['timestamp', 'DESC']],
      limit: 100
    });

    res.json(logs);
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const transactions = await Transaction.findAll({
      order: [['payment_date', 'DESC']]
    });

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

interface StatusUpdateResponse {
  message: string;
  xpAdded?: number;
  newRank?: string;
}

export const updateTransactionStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { transactionId } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, 'Not authenticated');
    }

    if (!['completed', 'failed'].includes(status)) {
      throw new ApiError(400, 'Invalid status');
    }

    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      throw new ApiError(404, 'Transaction not found');
    }

    await transaction.update({ payment_status: status });

    // Create log for transaction status update
    await Log.create({
      action: `TRANSACTION_${status.toUpperCase()}`,
      details: `Transaction ${transactionId} marked as ${status} by admin. Amount: ${transaction.payment_value}€`,
      admin_username: req.user.username,
      timestamp: new Date()
    });

    let response: StatusUpdateResponse = {
      message: 'Transaction status updated successfully'
    };

    // Add XP only for completed transactions
    if (status === 'completed') {
      const user = await User.findByPk(transaction.user_id);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      // Calculate XP based on transaction value (1 XP per euro)
      const xpToAdd = Math.floor(transaction.payment_value);
      const newXp = (user.xp || 0) + xpToAdd;
      const newRank = calculateNewRank(newXp);

      await user.update({
        xp: newXp,
        reward_rank: newRank
      });

      // Create log for XP award
      await Log.create({
        action: 'XP_AWARDED',
        details: `User ${user.username} earned ${xpToAdd} XP from transaction ${transactionId}`,
        admin_username: req.user.username,
        timestamp: new Date()
      });

      // Create log for rank update if necessary
      if (newRank !== user.reward_rank) {
        await Log.create({
          action: 'RANK_UPDATE',
          details: `User ${user.username} ranked up to ${newRank}`,
          admin_username: req.user.username,
          timestamp: new Date()
        });
      }

      response = {
        message: 'Transaction status updated and XP awarded',
        xpAdded: xpToAdd,
        newRank: newRank !== user.reward_rank ? newRank : undefined
      };
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
};