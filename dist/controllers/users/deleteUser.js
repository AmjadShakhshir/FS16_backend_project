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
exports.deleteUser = void 0;
const usersService_1 = __importDefault(require("../../services/usersService"));
const ApiError_1 = require("../../middlewares/errors/ApiError");
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.userId;
        const usersData = yield usersService_1.default.getSingleUser(id);
        if (!usersData) {
            next(ApiError_1.ApiError.resourceNotFound("User can't be deleted"));
            return;
        }
        usersService_1.default.deleteUser(id);
        res.status(200).json({ message: "User deleted" });
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=deleteUser.js.map