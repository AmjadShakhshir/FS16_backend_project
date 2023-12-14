import { NextFunction, Request, Response } from "express";

import services from "../../services/productsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newProduct = req.body;
  const product = await services.createOne(newProduct);
  if (!product) {
    next(ApiError.resourceNotFound("CategoryId is not found"));
    return;
  }
  res.status(201).json({
    message: "Product successfully created",
    product,
  });
};
