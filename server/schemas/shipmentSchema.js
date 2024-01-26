"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedShipmentSchema = exports.updatedShipmentBodySchema = exports.shipmentSchema = exports.shipmentBodySchema = void 0;
var mongoose_1 = require("mongoose");
var zod_1 = require("zod");
exports.shipmentBodySchema = zod_1.z
    .object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    street1: zod_1.z.string(),
    street2: zod_1.z.string().optional(),
    city: zod_1.z.string(),
    zipCode: zod_1.z.string(),
    state: zod_1.z.string(),
    country: zod_1.z.string(),
    shippingPrice: zod_1.z.number(),
})
    .strict();
exports.shipmentSchema = zod_1.z.object({
    body: exports.shipmentBodySchema,
});
exports.updatedShipmentBodySchema = zod_1.z
    .object({
    userId: zod_1.z
        .string()
        .refine(function (val) { return mongoose_1.default.Types.ObjectId.isValid(val); })
        .optional(),
    street1: zod_1.z.string().optional(),
    street2: zod_1.z.string().optional(),
    shippingPrice: zod_1.z.number().optional(),
    city: zod_1.z.string().optional(),
    zipCode: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
})
    .partial()
    .strict();
exports.updatedShipmentSchema = zod_1.z.object({
    body: exports.updatedShipmentBodySchema,
});
