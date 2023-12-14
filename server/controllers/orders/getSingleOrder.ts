import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import ordersService from '../../services/ordersService';

export const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.params.orderId;
  const order = await ordersService.getSingleOrder(orderId);

  if (!order) {
    next(ApiError.resourceNotFound('Order not found'));
    return;
  }
  res.status(200).json(order);
};
