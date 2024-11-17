import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password, mail } = req.body;

  if (!username || !password || !mail) {
    throw new ApiError(400, 'All fields are required');
  }

  if (username.length > 12) {
    throw new ApiError(400, 'Username must not exceed 12 characters');
  }

  if (username.length < 3) {
    throw new ApiError(400, 'Username must be at least 3 characters long');
  }

  if (password.length > 16) {
    throw new ApiError(400, 'Password must not exceed 16 characters');
  }

  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long');
  }

  if (!isValidEmail(mail)) {
    throw new ApiError(400, 'Invalid email format');
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, 'Username and password are required');
  }

  next();
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}