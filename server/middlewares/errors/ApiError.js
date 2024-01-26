"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
var ApiError = /** @class */ (function () {
    function ApiError(code, message) {
        this.code = code;
        this.message = message;
        this.code = code;
        this.message = message;
    }
    ApiError.resourceNotFound = function (msg) {
        return new ApiError(404, msg);
    };
    ApiError.badRequest = function (msg) {
        return new ApiError(400, msg);
    };
    ApiError.internal = function (msg) {
        return new ApiError(500, msg);
    };
    ApiError.forbidden = function (msg) {
        return new ApiError(403, msg);
    };
    return ApiError;
}());
exports.ApiError = ApiError;
