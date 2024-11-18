import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import '../types/environment.d';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key') as jwt.JwtPayload;
    
    const expirationTime = decoded.exp ? decoded.exp * 1000 : 0;
    const currentTime = Date.now();
    const timeRemaining = expirationTime - currentTime;
    
    if (timeRemaining < 300000) { 
      res.setHeader('X-Token-Expired', 'true');
    }
    
    req.user = {
      id: decoded.id,
      username: decoded.username
    };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new ApiError(401, 'Token expired'));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, 'Invalid token'));
    } else {
      next(error);
    }
  }
};