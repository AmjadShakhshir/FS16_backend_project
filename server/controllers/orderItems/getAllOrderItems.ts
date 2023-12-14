import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import ordersService from '../../services/ordersService';

export const getAllOrderItems = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const orderItems = await ordersService.getAllOrderItems();
  if (orderItems.length < 1) {
    next(ApiError.resourceNotFound('Order Items Not Found'));
    return;
  }
  res.status(200).json(orderItems);
};
