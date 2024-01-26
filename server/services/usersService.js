"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var UserModel_1 = require("../models/UserModel");
var RoleModel_1 = require("../models/RoleModel");
function findAll() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserModel_1.default.find()
                        .populate("roleId")
                        .exec()];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, users];
            }
        });
    });
}
function getSingleUser(index) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = new mongoose_1.default.Types.ObjectId(index);
                    return [4 /*yield*/, UserModel_1.default.findById(id)
                            .populate("roleId")];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
function updateUser(index, user) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, updatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hashedPassword = user.password ? bcrypt_1.default.hashSync(user.password, 10) : undefined;
                    user.password = hashedPassword;
                    return [4 /*yield*/, UserModel_1.default.findOneAndUpdate({ _id: index }, user, {
                            new: true,
                        })];
                case 1:
                    updatedUser = _a.sent();
                    return [2 /*return*/, updatedUser];
            }
        });
    });
}
function deleteUser(index) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserModel_1.default.findOneAndDelete({ _id: index })];
                case 1:
                    deletedUser = _a.sent();
                    return [2 /*return*/, deletedUser];
            }
        });
    });
}
function signUp(user) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hashedPassword = bcrypt_1.default.hashSync(user.password, 10);
                    newUser = new UserModel_1.default(__assign(__assign({}, user), { password: hashedPassword }));
                    return [4 /*yield*/, newUser.save()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, newUser];
            }
        });
    });
}
function logIn(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var foundUser, isValid, foundRole, payload, accessToken, loggedInUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
                case 1:
                    foundUser = _a.sent();
                    if (!foundUser || !foundUser.password) {
                        return [2 /*return*/, null];
                    }
                    isValid = bcrypt_1.default.compareSync(password, foundUser.password);
                    if (!isValid) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, RoleModel_1.default.findById({ _id: foundUser.roleId })];
                case 2:
                    foundRole = _a.sent();
                    if (!foundRole) {
                        return [2 /*return*/, null];
                    }
                    payload = {
                        _id: foundUser._id,
                        name: foundUser.name,
                        email: foundUser.email,
                        role: foundRole.name,
                        permissions: foundRole.permissions,
                        avatar: foundUser.avatar
                    };
                    accessToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                        expiresIn: "1h",
                    });
                    loggedInUser = __assign(__assign({}, payload), { accessToken: accessToken });
                    return [2 /*return*/, loggedInUser];
            }
        });
    });
}
function googleLogin(user) {
    return __awaiter(this, void 0, void 0, function () {
        var foundRole, payload, accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RoleModel_1.default.findById({ _id: user.roleId })];
                case 1:
                    foundRole = _a.sent();
                    if (user && foundRole) {
                        payload = {
                            email: user.email,
                            role: foundRole.name,
                        };
                        accessToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: "1h",
                        });
                        return [2 /*return*/, accessToken];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
exports.default = {
    findAll: findAll,
    getSingleUser: getSingleUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    signUp: signUp,
    logIn: logIn,
    googleLogin: googleLogin,
};
