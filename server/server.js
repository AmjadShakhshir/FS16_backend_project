"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
require("dotenv/config");
var app_1 = require("./app");
var port = process.env.PORT || 5000;
var mongoURL = process.env.DB_URL_COMMON;
mongoose_1.default.connect(mongoURL).then(function () { return console.log("Connected!"); });
app_1.default.listen(port, function () {
    console.log("\uD83D\uDC40 Server is running on localhost:".concat(port));
});
