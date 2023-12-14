import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.categoryId;
  const category = await categoriesService.getSingle(id);
  if (!category) {
    next(ApiError.resourceNotFound("Category not found"));
    return;
  }
  const updateData = req.body;
  const categoryWithSameName = await categoriesService.getSingleByName(
    updateData.name
  );
  if (categoryWithSameName !== null) {
    next(ApiError.badRequest("The category with the same name already exists"));
    return;
  }
  const updatedCategory = await categoriesService.updateCategory(
    id,
    updateData
  );
  res.status(200).json(updatedCategory);
}
