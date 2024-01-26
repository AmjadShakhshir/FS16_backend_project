"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = void 0;
var ApiError_1 = require("./errors/ApiError");
function checkRoles() {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, res, next) {
        var user = req.decoded;
        var hasMatchedRole = user && roles.includes(user.role);
        if (!hasMatchedRole) {
            next(ApiError_1.ApiError.forbidden("You do not have access"));
            return;
        }
        next();
    };
}
exports.checkRoles = checkRoles;
