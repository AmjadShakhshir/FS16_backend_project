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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CategoryModel_1 = require("../models/CategoryModel");
var ProductModel_1 = require("../models/ProductModel");
var createOne = function (newProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var category, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CategoryModel_1.default.findOne({
                    _id: newProduct.categoryId,
                })];
            case 1:
                category = _a.sent();
                if (!category) {
                    return [2 /*return*/, null];
                }
                product = new ProductModel_1.default(newProduct);
                return [4 /*yield*/, product.save()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var findAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ProductModel_1.default.find()
                    .populate("categoryId")
                    .exec()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var removeOne = function (productId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ProductModel_1.default.findByIdAndDelete(productId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var updateOne = function (updatedProduct, productId) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ProductModel_1.default.findByIdAndUpdate(productId, updatedProduct, {
                    new: true,
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var findOne = function (productId) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ProductModel_1.default.findById(productId)
                    .populate("categoryId")];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
var queryHandling = function (queries) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, sort, filterValues, pageNumber, pageSize, sortByPrice, _a, key, value, filteredProducts, products;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                page = queries.page, limit = queries.limit, sort = queries.sort, filterValues = __rest(queries, ["page", "limit", "sort"]);
                pageNumber = Number(page);
                pageSize = Number(limit);
                sortByPrice = sort
                    ? { price: sort }
                    : undefined;
                _a = Object.entries(filterValues)[0] || [], key = _a[0], value = _a[1];
                switch (true) {
                    case !isNaN(Number(value)):
                        filteredProducts = (_b = {}, _b[key] = { $eq: value }, _b);
                        break;
                    case mongoose_1.Types.ObjectId.isValid(value):
                        filteredProducts = (_c = {}, _c[key] = { $eq: new mongoose_1.Types.ObjectId(value) }, _c);
                        break;
                    case typeof value === "string":
                        filteredProducts = (_d = {}, _d[key] = { $regex: new RegExp(value, "i") }, _d);
                        break;
                    default:
                        filteredProducts = {};
                        break;
                }
                return [4 /*yield*/, ProductModel_1.default.find(filteredProducts)
                        .sort(sortByPrice)
                        .limit(pageSize)
                        .skip((pageNumber - 1) * pageSize)];
            case 1:
                products = _e.sent();
                return [2 /*return*/, products];
        }
    });
}); };
exports.default = {
    createOne: createOne,
    findAll: findAll,
    removeOne: removeOne,
    findOne: findOne,
    updateOne: updateOne,
    queryHandling: queryHandling,
};
