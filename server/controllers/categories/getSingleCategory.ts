import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export async function getSingleCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.categoryId;
  const category = await categoriesService.getSingle(id);
  if (category === null) {
    next(ApiError.resourceNotFound("Category not found"));
    return;
  }
  res.status(200).json(category);
}
