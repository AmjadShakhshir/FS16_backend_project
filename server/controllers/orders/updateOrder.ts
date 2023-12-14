import { NextFunction, Request, Response } from 'express';

import ordersService from '../../services/ordersService';
import { ApiError } from '../../middlewares/errors/ApiError';

export const updateOrder = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.params.orderId;
  const updatedOrder = req.body;

  const order = await ordersService.updateOrder(orderId, updatedOrder);

  if (!order) {
    next(ApiError.resourceNotFound('Order not found'));
    return;
  }
  res.status(200).json(order);
};
