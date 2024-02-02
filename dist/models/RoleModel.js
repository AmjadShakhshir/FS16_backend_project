"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const RoleSchema = new Schema({
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
//# sourceMappingURL=RoleModel.js.map