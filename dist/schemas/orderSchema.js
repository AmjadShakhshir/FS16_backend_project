"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderSchema = exports.newOrderBodySchema = exports.orderSchema = exports.orderBodySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
exports.orderBodySchema = zod_1.z.object({
    userId: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val)),
    totalAmount: zod_1.z.number(),
});
exports.orderSchema = zod_1.z.object({
    body: exports.orderBodySchema,
});
exports.newOrderBodySchema = zod_1.z.object({
    userId: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val)),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z
            .string()
            .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val)),
        quantity: zod_1.z.number(),
    })),
});
exports.newOrderSchema = zod_1.z.object({
    body: exports.newOrderBodySchema,
});
//# sourceMappingURL=orderSchema.js.map