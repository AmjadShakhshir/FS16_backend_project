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
exports.emailChecker = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
function emailChecker(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check if email already exists
            const emailIsExisted = yield UserModel_1.default.findOne({ email: req.body.email });
            if (emailIsExisted) {
                return res.status(400).json({ message: "Email already exists" });
            }
            next();
        }
        catch (error) {
            return res.status(500).json({ message: "Something went wrong in emailChecker" });
        }
    });
}
exports.emailChecker = emailChecker;
//# sourceMappingURL=emailChecker.js.map