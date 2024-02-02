"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
const ApiError_1 = require("./errors/ApiError");
const logging_1 = require("./logging");
const apiErrorHandler = (error, req, res, next) => {
    const paths = /^(\/products|\/categories|\/orders|\/users)/;
    if (error instanceof ApiError_1.ApiError) {
        res.status(error.code).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: "Something went wrong" });
    if (!paths.test(req.originalUrl))
        (0, logging_1.monitorRequest)(req, res, next, true);
};
exports.apiErrorHandler = apiErrorHandler;
//# sourceMappingURL=apiErrorHandler.js.map