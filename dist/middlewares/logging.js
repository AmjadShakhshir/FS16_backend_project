"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = exports.monitorRequest = exports.statusCodes = exports.requestCount = void 0;
exports.requestCount = 0;
exports.statusCodes = {
    "200": 0,
    "201": 0,
    "400": 0,
    "404": 0,
    "409": 0,
    "500": 0,
};
const monitorRequest = (req, res, next, isReturn) => {
    exports.requestCount++;
    if (true) {
        res.on("finish", () => {
            switch (Math.floor(res.statusCode)) {
                case 200:
                    exports.statusCodes["200"]++;
                    break;
                case 201:
                    exports.statusCodes["201"]++;
                    break;
                case 400:
                    exports.statusCodes["400"]++;
                    break;
                case 404:
                    exports.statusCodes["404"]++;
                    break;
                case 409:
                    exports.statusCodes["409"]++;
                    break;
                case 500:
                    exports.statusCodes["500"]++;
                    break;
                default:
                    break;
            }
            console.log("👀 [INFO]: ", req.method, req.originalUrl, res.statusCode, res.statusMessage);
            console.log("Total requests:", exports.requestCount);
            for (const [key, value] of Object.entries(exports.statusCodes)) {
                value > 0 && console.log(`Code: ${key}: requests: ${value}`);
            }
        });
    }
    if (isReturn) {
        return;
    }
    else {
        next();
    }
};
exports.monitorRequest = monitorRequest;
const loggingMiddleware = (req, res, next) => {
    (0, exports.monitorRequest)(req, res, next);
};
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=logging.js.map