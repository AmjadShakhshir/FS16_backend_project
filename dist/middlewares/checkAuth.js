"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("./errors/ApiError");
function checkAuth(req, _, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.error('Authorization header is not found');
        next(ApiError_1.ApiError.forbidden("Authorization header is not found"));
        return;
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        console.error('Authorization header is not in Bearer <token> format');
        next(ApiError_1.ApiError.forbidden("Authorization header is not in Bearer <token> format"));
        return;
    }
    const token = parts[1];
    if (!token) {
        next(ApiError_1.ApiError.forbidden("Token is not found"));
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    req.decoded = decoded;
    next();
}
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map