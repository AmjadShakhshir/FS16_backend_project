import { NextFunction, Request, Response } from "express";

import paymentsService from "../../services/paymentsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const getAllPayments = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const payments = await paymentsService.findAll();
  if (payments.length === 0) {
    next(ApiError.resourceNotFound("Payments data not found"));
    return;
  }
  res.status(200).json(payments);
};
