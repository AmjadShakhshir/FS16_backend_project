"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const ApiError_1 = require("./errors/ApiError");
function checkPermission(...permissions) {
    return (req, res, next) => {
        const user = req.decoded;
        const hasMatchedPermission = user && permissions.filter(perm => user.permissions.includes(perm)).length === permissions.length;
        if (!hasMatchedPermission) {
            next(ApiError_1.ApiError.forbidden("You are not authorized"));
            return;
        }
        next();
    };
}
exports.checkPermission = checkPermission;
//# sourceMappingURL=checkPermissions.js.map