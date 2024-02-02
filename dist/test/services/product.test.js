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
const productsService_1 = __importDefault(require("../../services/productsService"));
const ProductModel_1 = __importDefault(require("../../models/ProductModel"));
const CategoryModel_1 = __importDefault(require("../../models/CategoryModel"));
const db_helper_1 = __importDefault(require("../db-helper"));
describe("Product service", () => {
    let mongoHelper;
    let productOne;
    let productTwo;
    let productThree;
    let category;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const categoryInstance = new CategoryModel_1.default({
            name: "mobile",
            images: ["fdfgdf"],
        });
        category = yield categoryInstance.save();
        const iphoneProduct = new ProductModel_1.default({
            name: "iphone",
            description: "super phone",
            price: 123,
            categoryId: category._id.toString(),
            images: ["fdfgdf"],
            stock: 12,
        });
        const nokiaProduct = new ProductModel_1.default({
            name: "nokia mobile",
            description: "nokia description",
            price: 300,
            categoryId: category._id,
            images: ["fdfgdf"],
        });
        const sonyProduct = new ProductModel_1.default({
            name: "sony mobile",
            description: "sony description",
            price: 200,
            categoryId: category._id,
            images: ["fdfgdf"],
            stock: 10,
        });
        productOne = yield iphoneProduct.save();
        productTwo = yield nokiaProduct.save();
        productThree = yield sonyProduct.save();
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
    it("should create a new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            name: "mobile",
            description: "super phone",
            price: 123,
            categoryId: category._id.toString(),
            images: ["fdfgdf"],
            stock: 42,
        };
        const newProduct = yield productsService_1.default.createOne(product);
        expect(newProduct).toHaveProperty("_id");
        expect(newProduct === null || newProduct === void 0 ? void 0 : newProduct.price).toEqual(123);
    }));
    it("should return a list of products", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield productsService_1.default.findAll();
        expect(products.length).toEqual(3);
    }));
    it("should update product", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedProduct = yield productsService_1.default.updateOne({ name: "Ivan Sirko" }, productOne._id.toString());
        expect(updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.name).toEqual("Ivan Sirko");
        expect(updatedProduct).toHaveProperty("price");
    }));
    it("should find one product", () => __awaiter(void 0, void 0, void 0, function* () {
        const foundProduct = yield productsService_1.default.findOne(productOne._id.toString());
        expect(foundProduct === null || foundProduct === void 0 ? void 0 : foundProduct.name).toEqual("iphone");
        expect(foundProduct === null || foundProduct === void 0 ? void 0 : foundProduct.description).toEqual("super phone");
    }));
    it("should delete one product", () => __awaiter(void 0, void 0, void 0, function* () {
        yield productsService_1.default.removeOne(productOne._id.toString());
        const products = yield productsService_1.default.findAll();
        expect(products.length).toEqual(2);
    }));
    it("shouldn't delete when the id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        // invalid id
        yield productsService_1.default.removeOne("655ddd33a14052a8b4e508f4");
        const products = yield productsService_1.default.findAll();
        expect(products.length).toEqual(3);
    }));
    it("should asc sort products by price", () => __awaiter(void 0, void 0, void 0, function* () {
        const filteredProductsByPrice = yield productsService_1.default.queryHandling({
            sort: "asc",
        });
        expect(filteredProductsByPrice.length).toEqual(3);
        expect(filteredProductsByPrice[0].price).toBeLessThan(filteredProductsByPrice[1].price);
    }));
    it("should desc sort products by price", () => __awaiter(void 0, void 0, void 0, function* () {
        const filteredProductsByPrice = yield productsService_1.default.queryHandling({
            sort: "desc",
        });
        expect(filteredProductsByPrice.length).toEqual(3);
        expect(filteredProductsByPrice[0].price).toBeGreaterThan(filteredProductsByPrice[1].price);
    }));
    it("should filter products by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const filteredProductsByName = yield productsService_1.default.queryHandling({
            name: "iphone",
        });
        expect(filteredProductsByName.length).toEqual(1);
        expect(filteredProductsByName[0].name).toEqual("iphone");
    }));
    it("should filter products by description", () => __awaiter(void 0, void 0, void 0, function* () {
        const filteredProductsByDesc = yield productsService_1.default.queryHandling({
            description: "sony description",
        });
        expect(filteredProductsByDesc.length).toEqual(1);
        expect(filteredProductsByDesc[0].description).toEqual("sony description");
    }));
});
//# sourceMappingURL=product.test.js.map