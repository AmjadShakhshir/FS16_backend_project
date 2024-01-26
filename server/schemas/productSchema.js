"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = exports.uptadeProductSchema = exports.productBodySchema = void 0;
var mongoose_1 = require("mongoose");
var zod_1 = require("zod");
exports.productBodySchema = zod_1.z
    .object({
    name: zod_1.z.string({
        required_error: "Name is required",
    }),
    description: zod_1.z.string({
        required_error: "Description is required",
    }),
    price: zod_1.z.number({
        required_error: "Price is required",
    }),
    categoryId: zod_1.z
        .string()
        .refine(function (val) { return mongoose_1.default.Types.ObjectId.isValid(val); }),
    images: zod_1.z.array(zod_1.z.string({
        required_error: "Images are required",
    })),
    stock: zod_1.z.number({
        required_error: "Price is required",
    }),
})
    .strict();
exports.uptadeProductSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        description: zod_1.z.string().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        stock: zod_1.z.number().optional(),
    })
        .strict(),
});
exports.productSchema = zod_1.z.object({
    body: exports.productBodySchema
});
