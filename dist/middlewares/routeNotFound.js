"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = void 0;
const logging_1 = require("./logging");
function routeNotFound(req, res, next) {
    const paths = /^(\/products|\/categories|\/orders)/;
    res.status(404).json({ msg: "Route not found" });
    if (!paths.test(req.originalUrl))
        (0, logging_1.monitorRequest)(req, res, next, true);
}
exports.routeNotFound = routeNotFound;
//# sourceMappingURL=routeNotFound.js.map