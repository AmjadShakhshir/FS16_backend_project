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
exports.addPayment = void 0;
const paymentsService_1 = __importDefault(require("../../services/paymentsService"));
const ApiError_1 = require("../../middlewares/errors/ApiError");
const addPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newPayment = req.body;
    const payment = yield paymentsService_1.default.createOne(newPayment);
    if (payment === null) {
        next(ApiError_1.ApiError.badRequest("Payment not created"));
        return;
    }
    res.status(201).json({
        message: "Payment is created",
        payment,
    });
});
exports.addPayment = addPayment;
//# sourceMappingURL=addPayment.js.map