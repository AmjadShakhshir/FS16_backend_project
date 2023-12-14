import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const createData = req.body;
  const category = await categoriesService.getSingleByName(createData.name);
  if (category !== null) {
    next(ApiError.badRequest("The category with the same name already exists"));
    return;
  }
  const newCategory = await categoriesService.createCategory(createData);
  res
    .status(201)
    .json({
      message: "Category successfully created",
      newCategory,
    });
}
