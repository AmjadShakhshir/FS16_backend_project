import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.categoryId;
  const deletedCategory = await categoriesService.deleteCategory(id);
  if (deletedCategory === null) {
    next(
      ApiError.resourceNotFound(
        "Category can't be deleted: categoryId not found"
      )
    );
    return;
  }
  res.status(200).json({ message: "Category successfully deleted" });
}
