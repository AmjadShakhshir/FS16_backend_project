"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = void 0;
const ApiError_1 = require("./errors/ApiError");
function checkRoles(...roles) {
    return (req, res, next) => {
        const user = req.decoded;
        const hasMatchedRole = user && roles.includes(user.role);
        if (!hasMatchedRole) {
            next(ApiError_1.ApiError.forbidden("You do not have access"));
            return;
        }
        next();
    };
}
exports.checkRoles = checkRoles;
//# sourceMappingURL=checkRoles.js.map