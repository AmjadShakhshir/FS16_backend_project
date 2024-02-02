"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const supertest_1 = __importDefault(require("supertest"));
const RoleModel_1 = __importDefault(require("../../models/RoleModel"));
const app_1 = __importDefault(require("../../app"));
function authenticateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const role = new RoleModel_1.default({
            name: "ADMIN",
            permissions: ["READ", "CREATE", "DELETE", "UPDATE"],
        });
        yield role.save();
        const user = {
            name: "testName",
            email: "test1234@mail.com",
            password: "123456",
            roleId: role._id.toString(),
        };
        yield (0, supertest_1.default)(app_1.default).post("/users/signup").send(user);
        const loginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/users/login")
            .send({ email: "test1234@mail.com", password: "123456" });
        const accessToken = loginResponse.body;
        return accessToken;
    });
}
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authenticateUser.js.map