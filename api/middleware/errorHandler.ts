import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { ValidationError } from 'sequelize';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: err.message
    });
    return;
  }

  if (err instanceof ValidationError) {
    res.status(400).json({
      error: err.errors.map(e => e.message)
    });
    return;
  }

  res.status(500).json({
    error: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal server error'
  });
};