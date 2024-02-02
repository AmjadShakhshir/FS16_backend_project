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
const categoriesService_1 = __importDefault(require("../../services/categoriesService"));
const CategoryModel_1 = __importDefault(require("../../models/CategoryModel"));
const db_helper_1 = __importDefault(require("../db-helper"));
describe("Categories Service", () => {
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
    const category = {
        name: "test",
        images: ["image1", "image2"]
    };
    it("Should create a new category", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = yield categoriesService_1.default.createCategory(category);
        expect(newCategory).toHaveProperty("_id");
        expect(newCategory.name).toEqual("test");
    }));
    it("Should return a list of all categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const categories = yield categoriesService_1.default.getAll();
        expect(categories.length).toBe(1);
    }));
    it("Should return one category by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const fetchedCategory = yield categoriesService_1.default.getSingle(String(newCategory._id));
        expect(fetchedCategory).toMatchObject(category);
    }));
    it("Should return one category by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const fetchedCategory = yield categoriesService_1.default.getSingleByName(newCategory.name);
        expect(fetchedCategory).toMatchObject(category);
    }));
    it("Should return updated category", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const categoryId = String(newCategory._id);
        const updateData = {
            name: "updated test",
            images: ["updated 1", "updated 2", "updated 3"]
        };
        const updatedCategory = yield categoriesService_1.default.updateCategory(categoryId, updateData);
        expect(updatedCategory === null || updatedCategory === void 0 ? void 0 : updatedCategory.name).toEqual("updated test");
        expect(updatedCategory === null || updatedCategory === void 0 ? void 0 : updatedCategory.images.length).toBe(3);
    }));
    it("Should not update a category if an empty images array is passed", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const categoryId = String(newCategory._id);
        const updateData = {
            name: "updated test",
            images: ["updated 1", "updated 2", "updated 3"]
        };
        const updatedCategory = yield categoriesService_1.default.updateCategory(categoryId, updateData);
        expect(updatedCategory === null || updatedCategory === void 0 ? void 0 : updatedCategory.name).toEqual("updated test");
        expect(updatedCategory === null || updatedCategory === void 0 ? void 0 : updatedCategory.images.length).toBe(3);
    }));
    it("Should delete a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(category);
        yield newCategory.save();
        const isDeleted = yield categoriesService_1.default.deleteCategory(String(newCategory._id));
        const categories = yield CategoryModel_1.default.find();
        expect(isDeleted === null || isDeleted === void 0 ? void 0 : isDeleted._id).toEqual(newCategory._id);
        expect(categories.length).toBe(0);
    }));
});
//# sourceMappingURL=category.test.js.map