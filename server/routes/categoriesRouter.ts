import express from "express";

import controller from "../controllers/categories";
import { validate } from "../middlewares/validate";
import { categorySchema } from "../schemas/categorySchema";
import { checkAuth } from "../middlewares/checkAuth";
import { ROLE } from "../utils/role";
import { checkRoles } from "../middlewares/checkRoles";
import { checkPermission } from "../middlewares/checkPermissions";

const categoriesRouter = express.Router();

categoriesRouter.get("/", controller.getAllCategories);
categoriesRouter.get("/:categoryId", controller.getSingleCategory);
categoriesRouter.post(
  "/",
  validate(categorySchema),
  checkAuth,
  checkRoles(ROLE.ADMIN),
  checkPermission("CREATE"),
  controller.createCategory
);
categoriesRouter.put(
  "/:categoryId",
  validate(categorySchema),
  checkAuth,
  checkRoles(ROLE.ADMIN),
  checkPermission("UPDATE"),
  controller.updateCategory
);
categoriesRouter.delete(
  "/:categoryId",
  checkAuth,
  checkRoles(ROLE.ADMIN),
  checkPermission("DELETE"),
  controller.deleteCategory
);

export default categoriesRouter;
