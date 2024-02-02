"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
        this.code = code;
        this.message = message;
    }
    static resourceNotFound(msg) {
        return new ApiError(404, msg);
    }
    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    static internal(msg) {
        return new ApiError(500, msg);
    }
    static forbidden(msg) {
        return new ApiError(403, msg);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map