"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var PaymentSchema = new Schema({
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
