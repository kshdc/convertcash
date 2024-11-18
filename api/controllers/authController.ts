import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';

const validateMathCaptcha = (token: string): boolean => {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [answer, timestamp] = decoded.split('-');
    
    const now = Date.now();
    const tokenTime = parseInt(timestamp);
    if (now - tokenTime > 5 * 60 * 1000) {
      return false;
    }

    return !isNaN(parseInt(answer));
  } catch (error) {
    return false;
  }
};

const generateToken = (user: { id: number; username: string }): string => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'default-secret-key',
    { expiresIn: '1h' }
  );
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password, mail, captchaToken } = req.body;
    
    if (!captchaToken) {
      throw new ApiError(400, 'Captcha token is required');
    }

    const isValidCaptcha = validateMathCaptcha(captchaToken);
    if (!isValidCaptcha) {
      throw new ApiError(400, 'Invalid captcha');
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new ApiError(400, 'Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      user_id: Date.now(),
      username,
      password: hashedPassword,
      mail,
      adresse_ip: req.ip,
      rank: 'user',
      xp: 0
    });

    const token = generateToken(user);

    console.log('\x1b[32m%s\x1b[0m', `[${new Date().toISOString()}] New registration: ${username}`);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      expiresIn: 3600 
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password, captchaToken } = req.body;

    if (!captchaToken) {
      throw new ApiError(400, 'Captcha token is required');
    }

    const isValidCaptcha = validateMathCaptcha(captchaToken);
    if (!isValidCaptcha) {
      throw new ApiError(400, 'Invalid captcha');
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = generateToken(user);

    console.log('\x1b[34m%s\x1b[0m', `[${new Date().toISOString()}] User logged in: ${username}`);

    res.json({
      message: 'Login successful',
      token,
      expiresIn: 3600
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id || !req.user?.username) {
      throw new ApiError(401, 'Not authenticated');
    }

    const token = generateToken(req.user);

    res.json({
      token,
      expiresIn: 3600  
    });
  } catch (error) {
    next(error);
  }
};