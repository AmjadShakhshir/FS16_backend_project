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
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentModel_1 = __importDefault(require("../models/PaymentModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const shipmentsService_1 = __importDefault(require("./shipmentsService"));
const createOne = (newPayment) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, method, bankName, accountNumber, shipmentInfo } = newPayment;
    const user = yield UserModel_1.default.findById(userId);
    if (!user) {
        return null;
    }
    const paymentDate = new Date();
    const existingPayment = yield PaymentModel_1.default.findOne({
        userId,
    });
    if (!existingPayment) {
        const createdPayment = new PaymentModel_1.default({
            userId,
            method,
            bankName,
            accountNumber,
            paymentDate,
        });
        const createdShipment = yield shipmentsService_1.default.createShipment(Object.assign(Object.assign({}, shipmentInfo), { userId: new mongoose_1.default.Types.ObjectId(userId) }));
        yield createdPayment.save();
        return Object.assign(Object.assign({}, createdPayment.toObject()), { shipment: createdShipment });
    }
    existingPayment.method = method;
});
const removeOne = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PaymentModel_1.default.findByIdAndDelete(paymentId);
});
const findOne = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PaymentModel_1.default.findById(paymentId)
        .populate("userId");
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield PaymentModel_1.default.find()
        .populate("userId")
        .exec();
});
exports.default = {
    removeOne,
    findOne,
    findAll,
    createOne
};
//# sourceMappingURL=paymentsService.js.map