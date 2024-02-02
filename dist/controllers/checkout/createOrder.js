"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const ordersService_1 = __importDefault(require("../../services/ordersService"));
const ApiError_1 = require("../../middlewares/errors/ApiError");
function createOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOrderData = req.body;
        const createdOrder = yield ordersService_1.default.createOrder(newOrderData);
        if (!createdOrder) {
            next(ApiError_1.ApiError.badRequest("Order nor created"));
            return;
        }
        res.status(201).json({ message: "order is created", createdOrder });
    });
}
exports.createOrder = createOrder;
//# sourceMappingURL=createOrder.js.map