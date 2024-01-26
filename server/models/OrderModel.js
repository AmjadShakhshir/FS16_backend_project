"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var orderSchema = new Schema({
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
