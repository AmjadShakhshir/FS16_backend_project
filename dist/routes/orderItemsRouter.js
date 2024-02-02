"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllOrderItems_1 = require("../controllers/orderItems/getAllOrderItems");
const orderItemsRouter = express_1.default.Router();
orderItemsRouter.get("/", getAllOrderItems_1.getAllOrderItems);
exports.default = orderItemsRouter;
//# sourceMappingURL=orderItemsRouter.js.map