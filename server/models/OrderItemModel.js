"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var orderItemSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: Number,
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("OrderItem", orderItemSchema);
