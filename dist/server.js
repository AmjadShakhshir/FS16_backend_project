"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 5000;
const mongoURL = process.env.DB_URL_COMMON;
mongoose_1.default.connect(mongoURL).then(() => console.log("Connected!"));
app_1.default.listen(port, () => {
    console.log(`👀 Server is running on localhost:${port}`);
});
//# sourceMappingURL=server.js.map