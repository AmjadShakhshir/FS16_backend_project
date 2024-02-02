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
exports.getAllOrderItems = void 0;
const ApiError_1 = require("../../middlewares/errors/ApiError");
const ordersService_1 = __importDefault(require("../../services/ordersService"));
const getAllOrderItems = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItems = yield ordersService_1.default.getAllOrderItems();
    if (orderItems.length < 1) {
        next(ApiError_1.ApiError.resourceNotFound('Order Items Not Found'));
        return;
    }
    res.status(200).json(orderItems);
});
exports.getAllOrderItems = getAllOrderItems;
//# sourceMappingURL=getAllOrderItems.js.map