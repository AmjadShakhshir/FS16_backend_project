import { z } from "zod";
import { categoryBodySchema } from "../schemas/categorySchema";
import mongoose from "mongoose";

export type CategoryDto = z.infer<typeof categoryBodySchema>
export type Category = CategoryDto & {_id: mongoose.Types.ObjectId}
export type CreateCategoryInput = CategoryDto
export type UpdateCategoryInput = Partial<CategoryDto>

