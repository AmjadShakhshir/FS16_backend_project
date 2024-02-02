"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PaymentSchema = new Schema({
    method: {
        type: String,
        enum: ["credit_card", "bank_transfer", "paypal"],
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("Payment", PaymentSchema);
//# sourceMappingURL=PaymentModel.js.map