"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllOrders_1 = require("../controllers/orders/getAllOrders");
const getSingleOrder_1 = require("../controllers/orders/getSingleOrder");
const deleteOrder_1 = require("../controllers/orders/deleteOrder");
const addOrder_1 = require("../controllers/orders/addOrder");
const updateOrder_1 = require("../controllers/orders/updateOrder");
const validate_1 = require("../middlewares/validate");
const orderSchema_1 = require("../schemas/orderSchema");
const checkAuth_1 = require("../middlewares/checkAuth");
const checkPermissions_1 = require("../middlewares/checkPermissions");
const role_1 = require("../utils/role");
const checkRoles_1 = require("../middlewares/checkRoles");
const ordersRouter = (0, express_1.Router)();
ordersRouter.get('/', checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN), (0, checkPermissions_1.checkPermission)("READ"), getAllOrders_1.getAllOrders);
ordersRouter.get('/:orderId', checkAuth_1.checkAuth, getSingleOrder_1.getSingleOrder);
ordersRouter.post('/', (0, validate_1.validate)(orderSchema_1.orderSchema), checkAuth_1.checkAuth, addOrder_1.addOrder);
ordersRouter.patch("/:orderId", (0, validate_1.validate)(orderSchema_1.orderSchema), checkAuth_1.checkAuth, updateOrder_1.updateOrder);
ordersRouter.delete("/:orderId", checkAuth_1.checkAuth, deleteOrder_1.deleteOrder);
exports.default = ordersRouter;
//# sourceMappingURL=ordersRouter.js.map