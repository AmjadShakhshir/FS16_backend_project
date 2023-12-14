import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import ordersService from '../../services/ordersService';

export const getAllOrders = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const ordersList = await ordersService.getOrders();
  if (ordersList.length < 1) {
    next(ApiError.resourceNotFound('Order not found'));
    return;
  }
  res.status(200).json(ordersList);
};
