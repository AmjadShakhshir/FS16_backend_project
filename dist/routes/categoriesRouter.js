"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_1 = __importDefault(require("../controllers/categories"));
const validate_1 = require("../middlewares/validate");
const categorySchema_1 = require("../schemas/categorySchema");
const checkAuth_1 = require("../middlewares/checkAuth");
const role_1 = require("../utils/role");
const checkRoles_1 = require("../middlewares/checkRoles");
const checkPermissions_1 = require("../middlewares/checkPermissions");
const categoriesRouter = express_1.default.Router();
categoriesRouter.get("/", categories_1.default.getAllCategories);
categoriesRouter.get("/:categoryId", categories_1.default.getSingleCategory);
categoriesRouter.post("/", (0, validate_1.validate)(categorySchema_1.categorySchema), checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN), (0, checkPermissions_1.checkPermission)("CREATE"), categories_1.default.createCategory);
categoriesRouter.put("/:categoryId", (0, validate_1.validate)(categorySchema_1.categorySchema), checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN), (0, checkPermissions_1.checkPermission)("UPDATE"), categories_1.default.updateCategory);
categoriesRouter.delete("/:categoryId", checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN), (0, checkPermissions_1.checkPermission)("DELETE"), categories_1.default.deleteCategory);
exports.default = categoriesRouter;
//# sourceMappingURL=categoriesRouter.js.map