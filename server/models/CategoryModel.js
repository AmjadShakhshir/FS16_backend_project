"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("Category", CategorySchema);
