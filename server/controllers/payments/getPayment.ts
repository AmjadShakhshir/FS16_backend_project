import { NextFunction, Request, Response } from "express";

import paymentsService from "../../services/paymentsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const getPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.paymentId;
  const payment = await paymentsService.findOne(id);
  if (payment === null) {
    next(ApiError.resourceNotFound("Payment not found"));
    return;
  }
  res.status(200).json({ message: "Payment is found", payment });
};
