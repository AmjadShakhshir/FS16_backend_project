import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import ordersService from '../../services/ordersService';

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newOrder = req.body;
  const order = await ordersService.addOrder(newOrder);

  if (!order) {
    next(ApiError.badRequest('Not a valid data'));
    return;
  }
  res.status(201).json(order);
};
