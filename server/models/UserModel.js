"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
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
