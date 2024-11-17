import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';

export const adminOnly = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new ApiError(401, 'Not authenticated');
    }

    const user = await User.findByPk(req.user.id);
    if (!user || user.rank !== 'admin') {
      throw new ApiError(403, 'Access denied');
    }

    next();
  } catch (error) {
    next(error);
  }
};