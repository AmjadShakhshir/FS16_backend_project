import { NextFunction, Request, Response } from 'express';

import ordersService from '../../services/ordersService';
import { ApiError } from '../../middlewares/errors/ApiError';

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.params.orderId;
  const foundIndex = await ordersService.removeOrder(orderId);

  if (foundIndex === null) {
    next(ApiError.resourceNotFound('Order not found'));
    return;
  }

  res.status(200).json({ message: 'Order deleted successfully' });
};
