"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchema = exports.paymentBodySchema = void 0;
var mongoose_1 = require("mongoose");
var zod_1 = require("zod");
var shipmentSchema_1 = require("./shipmentSchema");
exports.paymentBodySchema = zod_1.z
    .object({
    userId: zod_1.z.string().refine(function (val) { return mongoose_1.default.Types.ObjectId.isValid(val); }),
    method: zod_1.z.enum(["credit_card", "bank_transfer", "paypal"]),
    bankName: zod_1.z.string({
        required_error: "BankName  is required",
    }),
    accountNumber: zod_1.z.string({
        required_error: "AccountNumber  is required",
    }),
    shipmentInfo: shipmentSchema_1.shipmentBodySchema,
    amount: zod_1.z.number({
        required_error: "Amount  is required",
    }),
})
    .strict();
exports.paymentSchema = zod_1.z.object({
    body: exports.paymentBodySchema,
});
