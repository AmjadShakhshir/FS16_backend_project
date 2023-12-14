import { NextFunction, Request, Response } from "express";

import paymentsService from "../../services/paymentsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const addPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newPayment = req.body;
  const payment = await paymentsService.createOne(newPayment);
  if (payment === null || payment.length === 0) {
    next(ApiError.badRequest("Payment not created"));
    return;
  }
  res.status(201).json({
    message: "Payment is created",
    payment,
  });
};
