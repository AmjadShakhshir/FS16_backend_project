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
const CategoryModel_1 = __importDefault(require("../../models/CategoryModel"));
const db_helper_1 = __importDefault(require("../db-helper"));
const app_1 = __importDefault(require("../../app"));
const authenticateUser_1 = require("../auth/authenticateUser");
describe("Categories Controller", () => {
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
    const category = {
        name: "test",
        images: ["image1", "image2"],
    };
    it("Should create a new category", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/categories")
            .send(category)
            .set("Authorization", `Bearer ${accessToken.accessToken}`);
        expect(response.body.newCategory).toHaveProperty("name");
        expect(response.body).toMatchObject({ newCategory: category });
        expect(response.body.message).toBe("Category successfully created");
    }));
    it("Should return a list of categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const response = yield (0, supertest_1.default)(app_1.default).get("/categories");
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toMatchObject(category);
    }));
    it("Should return one category by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const response = yield (0, supertest_1.default)(app_1.default).get(`/categories/${newCategory._id}`);
        expect(response.body).toMatchObject(category);
    }));
    it("Should update a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/categories/${newCategory._id}`)
            .send({ name: "updated", images: ["up1", "up2"] })
            .set("Authorization", `Bearer ${accessToken.accessToken}`);
        expect(response.body.name).toEqual("updated");
        expect(response.body.images).toEqual(["up1", "up2"]);
    }));
    it("Should delete a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/categories/${newCategory._id}`)
            .set("Authorization", `Bearer ${accessToken.accessToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Category successfully deleted");
    }));
});
//# sourceMappingURL=category.test.js.map