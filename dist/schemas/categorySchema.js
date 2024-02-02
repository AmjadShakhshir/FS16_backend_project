"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = exports.categoryBodySchema = void 0;
const zod_1 = require("zod");
exports.categoryBodySchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Category name is required",
    }),
    images: zod_1.z
        .array(zod_1.z.string({
        required_error: "Should be at least one category image",
    }))
        .max(3),
});
exports.categorySchema = zod_1.z.object({
    body: exports.categoryBodySchema,
});
//# sourceMappingURL=categorySchema.js.map