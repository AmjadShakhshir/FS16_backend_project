"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const RoleModel_1 = __importDefault(require("../models/RoleModel"));
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserModel_1.default.find()
            .populate("roleId")
            .exec();
        return users;
    });
}
function getSingleUser(index) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(index);
        const user = yield UserModel_1.default.findById(id)
            .populate("roleId");
        return user;
    });
}
function updateUser(index, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = user.password ? bcrypt_1.default.hashSync(user.password, 10) : undefined;
        user.password = hashedPassword;
        const updatedUser = yield UserModel_1.default.findOneAndUpdate({ _id: index }, user, {
            new: true,
        });
        return updatedUser;
    });
}
function deleteUser(index) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedUser = yield UserModel_1.default.findOneAndDelete({ _id: index });
        return deletedUser;
    });
}
function signUp(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = bcrypt_1.default.hashSync(user.password, 10);
        const newUser = new UserModel_1.default(Object.assign(Object.assign({}, user), { password: hashedPassword }));
        yield newUser.save();
        return newUser;
    });
}
function logIn(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundUser = yield UserModel_1.default.findOne({ email: email });
        if (!foundUser || !foundUser.password) {
            return null;
        }
        const isValid = bcrypt_1.default.compareSync(password, foundUser.password);
        if (!isValid) {
            return null;
        }
        const foundRole = yield RoleModel_1.default.findById({ _id: foundUser.roleId });
        if (!foundRole) {
            return null;
        }
        const payload = {
            _id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundRole.name,
            permissions: foundRole.permissions,
            avatar: foundUser.avatar
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
        });
        const loggedInUser = Object.assign(Object.assign({}, payload), { accessToken });
        return loggedInUser;
    });
}
function googleLogin(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundRole = yield RoleModel_1.default.findById({ _id: user.roleId });
        if (user && foundRole) {
            const payload = {
                email: user.email,
                role: foundRole.name,
            };
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: "1h",
            });
            return accessToken;
        }
        return null;
    });
}
exports.default = {
    findAll,
    getSingleUser,
    updateUser,
    deleteUser,
    signUp,
    logIn,
    googleLogin,
};
//# sourceMappingURL=usersService.js.map