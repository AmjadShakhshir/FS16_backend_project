"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    totalAmount: Number,
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
    },
    shipmentId: {
        type: Schema.Types.ObjectId,
        ref: "Shipment",
    },
    shipmentStatus: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("Order", orderSchema);
//# sourceMappingURL=OrderModel.js.map