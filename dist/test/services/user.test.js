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
const db_helper_1 = __importDefault(require("../db-helper"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersService_1 = __importDefault(require("../../services/usersService"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
describe("user service", () => {
    let mongoHelper;
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
        const newUser = yield usersService_1.default.signUp(user);
        if (!newUser) {
            return;
        }
        expect(newUser).toHaveProperty("_id");
        expect(newUser.name).toEqual("test");
        expect(newUser.email).toEqual("test@mail.com");
        // Check if the password was hashed correctly
        const isPasswordMatch = newUser.password ? yield bcrypt_1.default.compare(user.password, newUser.password) : false;
        expect(isPasswordMatch).toBe(true);
    }));
    it("Should return a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new UserModel_1.default(user);
        yield newUser.save();
        const users = yield usersService_1.default.findAll();
        expect(users.length).toBe(1);
    }));
    it("Should return one user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new UserModel_1.default(user);
        yield newUser.save();
        const fetchedUser = yield usersService_1.default.getSingleUser(String(newUser._id));
        expect(fetchedUser).toMatchObject(user);
    }));
    it("Should update a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new UserModel_1.default(user);
        yield newUser.save();
        const userId = String(newUser._id);
        const updateData = {
            name: "updated",
            email: "updated@mail.com",
        };
        const updatedUser = yield usersService_1.default.updateUser(userId, updateData);
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name).toEqual("updated");
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email).toEqual("updated@mail.com");
    }));
    it("Should delete a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new UserModel_1.default(user);
        yield newUser.save();
        const userId = String(newUser._id);
        const deletedUser = yield usersService_1.default.deleteUser(userId);
        expect(deletedUser).toMatchObject(user);
    }));
});
//# sourceMappingURL=user.test.js.map