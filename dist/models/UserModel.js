"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    roleId: {
        type: Schema.Types.ObjectId,
        default: "6554c883ab8e8fbcc83c643a",
        ref: "Role",
    },
    logInWithGoogle: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: "",
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=UserModel.js.map