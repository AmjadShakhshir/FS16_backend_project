"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
var ApiError_1 = require("./errors/ApiError");
var logging_1 = require("./logging");
var apiErrorHandler = function (error, req, res, next) {
    var paths = /^(\/products|\/categories|\/orders|\/users)/;
    if (error instanceof ApiError_1.ApiError) {
        res.status(error.code).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: "Something went wrong" });
    if (!paths.test(req.originalUrl))
        (0, logging_1.monitorRequest)(req, res, next, true);
};
exports.apiErrorHandler = apiErrorHandler;
