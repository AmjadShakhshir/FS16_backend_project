"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createOrder_1 = require("../controllers/checkout/createOrder");
const orderSchema_1 = require("../schemas/orderSchema");
const validate_1 = require("../middlewares/validate");
const checkAuth_1 = require("../middlewares/checkAuth");
const checkoutRouter = express_1.default.Router();
checkoutRouter.post("/", (0, validate_1.validate)(orderSchema_1.newOrderSchema), checkAuth_1.checkAuth, createOrder_1.createOrder);
exports.default = checkoutRouter;
//# sourceMappingURL=checkoutRouter.js.map