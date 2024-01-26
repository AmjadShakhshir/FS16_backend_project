"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var ShipmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    street1: {
        type: String,
        required: true,
    },
    street2: {
        type: String,
        required: false,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("Shipment", ShipmentSchema);
