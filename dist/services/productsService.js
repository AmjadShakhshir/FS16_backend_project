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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const createOne = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield CategoryModel_1.default.findOne({
        _id: newProduct.categoryId,
    });
    if (!category) {
        return null;
    }
    const product = new ProductModel_1.default(newProduct);
    return yield product.save();
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductModel_1.default.find()
        .populate("categoryId")
        .exec();
});
const removeOne = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ProductModel_1.default.findByIdAndDelete(productId);
});
const updateOne = (updatedProduct, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ProductModel_1.default.findByIdAndUpdate(productId, updatedProduct, {
        new: true,
    });
    return result;
});
const findOne = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.default.findById(productId)
        .populate("categoryId");
    return product;
});
const queryHandling = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sort } = queries, filterValues = __rest(queries, ["page", "limit", "sort"]);
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const sortByPrice = sort
        ? { price: sort }
        : undefined;
    const [key, value] = Object.entries(filterValues)[0] || [];
    let filteredProducts;
    switch (true) {
        case !isNaN(Number(value)):
            filteredProducts = { [key]: { $eq: value } };
            break;
        case mongoose_1.Types.ObjectId.isValid(value):
            filteredProducts = { [key]: { $eq: new mongoose_1.Types.ObjectId(value) } };
            break;
        case typeof value === "string":
            filteredProducts = { [key]: { $regex: new RegExp(value, "i") } };
            break;
        default:
            filteredProducts = {};
            break;
    }
    const products = yield ProductModel_1.default.find(filteredProducts)
        .sort(sortByPrice)
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize);
    return products;
});
exports.default = {
    createOne,
    findAll,
    removeOne,
    findOne,
    updateOne,
    queryHandling,
};
//# sourceMappingURL=productsService.js.map