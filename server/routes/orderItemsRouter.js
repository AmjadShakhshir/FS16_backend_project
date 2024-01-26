"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var getAllOrderItems_1 = require("../controllers/orderItems/getAllOrderItems");
var orderItemsRouter = express_1.default.Router();
orderItemsRouter.get("/", getAllOrderItems_1.getAllOrderItems);
exports.default = orderItemsRouter;
