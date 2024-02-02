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
const supertest_1 = __importDefault(require("supertest"));
const db_helper_1 = __importDefault(require("../db-helper"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = __importDefault(require("../../app"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const authenticateUser_1 = require("../auth/authenticateUser");
describe("User controller", () => {
    let mongoHelper;
    let accessToken;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        accessToken = yield (0, authenticateUser_1.authenticateUser)();
    }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoHelper = yield (0, db_helper_1.default)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoHelper.clearDatabase();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoHelper.closeDatabase();
    }));
    const user = {
        name: "test",
        email: "test@mail.com",
        password: "123456",
    };
    it("Should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users/signup")
            .set("Authorization", `Bearer ${accessToken.accessToken}`)
            .send(user);
        // Check if the password was hashed correctly
        const isPasswordMatch = yield bcrypt_1.default.compare(user.password, response.body.user.password);
        expect(isPasswordMatch).toBe(true);
        // Check the properties of the user object
        expect(response.body.user).toHaveProperty("_id");
        expect(response.body.user).toHaveProperty("avatar");
        expect(response.body.user).toHaveProperty("logInWithGoogle");
        expect(response.body).toMatchObject({ user: Object.assign(Object.assign({}, user), { password: response.body.user.password }) });
        // Check the values of the user object
        expect(response.body.user).toEqual({
            _id: expect.any(String),
            avatar: expect.any(String),
            email: user.email,
            logInWithGoogle: expect.any(Boolean),
            name: user.name,
            password: response.body.user.password,
            roleId: expect.any(String),
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User created");
    }));
    it("Should return a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new UserModel_1.default(user);
        yield newUser.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/users")
            .set("Authorization", `Bearer ${accessToken.accessToken}`);
        expect(response.body.length).toBe(2);
        expect(response.body[1]).toMatchObject(user);
        expect(response.status).toBe(200);
    }));
    it("Should return one user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new UserModel_1.default(user);
        yield newUser.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/users/profile/${newUser._id}`)
            .set("Authorization", `Bearer ${accessToken.accessToken}`);
        expect(response.body.user).toMatchObject({
            avatar: expect.any(String),
            email: user.email,
            name: user.name,
        });
        expect(response.status).toBe(200);
    }));
    it("Should update a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new UserModel_1.default(user);
        yield newUser.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/users/${newUser._id}`)
            .send({ name: "updated", email: "updated@mail.com" })
            .set("Authorization", `Bearer ${accessToken.accessToken}`);
        expect(response.body.user.name).toBe("updated");
        expect(response.body.user.email).toBe("updated@mail.com");
        expect(response.status).toBe(200);
    }));
    it("Should delete a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new UserModel_1.default(user);
        yield newUser.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users/${newUser._id}`)
            .set("Authorization", `Bearer ${accessToken.accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User deleted");
    }));
});
//# sourceMappingURL=user.test.js.map