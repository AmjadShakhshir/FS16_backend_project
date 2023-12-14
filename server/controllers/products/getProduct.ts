import { NextFunction, Request, Response } from "express";

import services from "../../services/productsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.productId;
  const product = await services.findOne(id);
  if (!product) {
    next(ApiError.resourceNotFound("Product  is not found"));
    return;
  }
  res.status(200).json(product);
};
