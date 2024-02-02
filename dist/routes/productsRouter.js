"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("../controllers/products"));
const validate_1 = require("../middlewares/validate");
const productSchema_1 = require("../schemas/productSchema");
const controlWrapper_1 = require("../middlewares/controlWrapper");
const checkAuth_1 = require("../middlewares/checkAuth");
const checkRoles_1 = require("../middlewares/checkRoles");
const role_1 = require("../utils/role");
const checkPermissions_1 = require("../middlewares/checkPermissions");
const router = express_1.default.Router();
router.get("/", (0, controlWrapper_1.controlWrapper)(products_1.default.getAllProducts));
router.get("/:productId", (0, controlWrapper_1.controlWrapper)(products_1.default.getProduct));
router.post("/", (0, validate_1.validate)(productSchema_1.productSchema), checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN), (0, checkPermissions_1.checkPermission)("CREATE"), (0, controlWrapper_1.controlWrapper)(products_1.default.addProduct));
router.delete("/:productId", checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN), (0, checkPermissions_1.checkPermission)("DELETE"), (0, controlWrapper_1.controlWrapper)(products_1.default.deleteProduct));
router.put("/:productId", checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN), (0, checkPermissions_1.checkPermission)("UPDATE"), (0, validate_1.validate)(productSchema_1.uptadeProductSchema), (0, controlWrapper_1.controlWrapper)(products_1.default.updateProduct));
exports.default = router;
//# sourceMappingURL=productsRouter.js.map