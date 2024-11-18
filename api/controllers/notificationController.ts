import { Request, Response, NextFunction } from 'express';
import { Notification } from '../models/Notification';
import { ApiError } from '../utils/ApiError';

export const getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new ApiError(401, 'Not authenticated');
    }

    const notifications = await Notification.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']]
    });

    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!req.user?.id) {
      throw new ApiError(401, 'Not authenticated');
    }

    const notification = await Notification.findOne({
      where: { 
        id,
        user_id: req.user.id
      }
    });

    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }

    await notification.update({ read: true });

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw new ApiError(401, 'Not authenticated');
    }

    await Notification.update(
      { read: true },
      { where: { user_id: req.user.id } }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};