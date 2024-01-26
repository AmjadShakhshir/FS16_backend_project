"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var ApiError_1 = require("./errors/ApiError");
function checkAuth(req, _, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        console.error('Authorization header is not found');
        next(ApiError_1.ApiError.forbidden("Authorization header is not found"));
        return;
    }
    var parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        console.error('Authorization header is not in Bearer <token> format');
        next(ApiError_1.ApiError.forbidden("Authorization header is not in Bearer <token> format"));
        return;
    }
    var token = parts[1];
    if (!token) {
        next(ApiError_1.ApiError.forbidden("Token is not found"));
        return;
    }
    var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    req.decoded = decoded;
    next();
}
exports.checkAuth = checkAuth;
