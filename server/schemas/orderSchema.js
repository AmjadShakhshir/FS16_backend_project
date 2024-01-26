"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderSchema = exports.newOrderBodySchema = exports.orderSchema = exports.orderBodySchema = void 0;
var mongoose_1 = require("mongoose");
var zod_1 = require("zod");
exports.orderBodySchema = zod_1.z.object({
    userId: zod_1.z.string().refine(function (val) { return mongoose_1.default.Types.ObjectId.isValid(val); }),
    totalAmount: zod_1.z.number(),
});
exports.orderSchema = zod_1.z.object({
    body: exports.orderBodySchema,
});
exports.newOrderBodySchema = zod_1.z.object({
    userId: zod_1.z.string().refine(function (val) { return mongoose_1.default.Types.ObjectId.isValid(val); }),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z
            .string()
            .refine(function (val) { return mongoose_1.default.Types.ObjectId.isValid(val); }),
        quantity: zod_1.z.number(),
    })),
});
exports.newOrderSchema = zod_1.z.object({
    body: exports.newOrderBodySchema,
});
