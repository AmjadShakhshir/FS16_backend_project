"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var RoleSchema = new Schema({
    name: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
        required: true,
    },
    permissions: {
        type: [String],
        enum: ["READ", "CREATE", "DELETE", "UPDATE"],
        required: true
    }
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("Role", RoleSchema);
