import { Request, Response, NextFunction } from "express";

import ordersService from "../../services/ordersService";
import { newOrderData } from "../../types/Order";
import { ApiError } from "../../middlewares/errors/ApiError";

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  const newOrderData: newOrderData = req.body
  const createdOrder = await ordersService.createOrder(newOrderData)
  if (!createdOrder) {
    next(ApiError.badRequest("Order nor created"));
    return
  }
  res.status(201).json({ message: "order is created", createdOrder });
}
