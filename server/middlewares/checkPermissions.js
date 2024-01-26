"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
var ApiError_1 = require("./errors/ApiError");
function checkPermission() {
    var permissions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        permissions[_i] = arguments[_i];
    }
    return function (req, res, next) {
        var user = req.decoded;
        var hasMatchedPermission = user && permissions.filter(function (perm) { return user.permissions.includes(perm); }).length === permissions.length;
        if (!hasMatchedPermission) {
            next(ApiError_1.ApiError.forbidden("You are not authorized"));
            return;
        }
        next();
    };
}
exports.checkPermission = checkPermission;
