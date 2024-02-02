"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payments_1 = __importDefault(require("../controllers/payments"));
const validate_1 = require("../middlewares/validate");
const paymentSchema_1 = require("../schemas/paymentSchema");
const checkAuth_1 = require("../middlewares/checkAuth");
const checkRoles_1 = require("../middlewares/checkRoles");
const role_1 = require("../utils/role");
const checkPermissions_1 = require("../middlewares/checkPermissions");
const router = express_1.default.Router();
router.get("/", checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN, role_1.ROLE.USER), (0, checkPermissions_1.checkPermission)("READ"), payments_1.default.getAllPayments);
router.get("/:paymentId", checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN, role_1.ROLE.USER), (0, checkPermissions_1.checkPermission)("READ"), payments_1.default.getPayment);
router.post("/", (0, validate_1.validate)(paymentSchema_1.paymentSchema), checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN, role_1.ROLE.USER), (0, checkPermissions_1.checkPermission)("CREATE"), payments_1.default.addPayment);
router.delete("/:paymentId", checkAuth_1.checkAuth, payments_1.default.removePayment);
exports.default = router;
//# sourceMappingURL=paymentsRouter.js.map