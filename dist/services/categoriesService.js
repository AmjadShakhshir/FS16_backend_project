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
const mongoose_1 = __importDefault(require("mongoose"));
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield CategoryModel_1.default.find().exec();
    });
}
function getSingle(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(categoryId);
        return yield CategoryModel_1.default.findOne({ _id: id }).exec();
    });
}
function getSingleByName(categoryName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield CategoryModel_1.default.findOne({ name: categoryName }).exec();
    });
}
function createCategory(createData) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCategory = new CategoryModel_1.default(createData);
        return yield newCategory.save();
    });
}
function updateCategory(categoryId, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(categoryId);
        return yield CategoryModel_1.default.findByIdAndUpdate(id, updateData, { new: true });
    });
}
function deleteCategory(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(categoryId);
        return yield CategoryModel_1.default.findByIdAndDelete(id);
    });
}
exports.default = {
    getAll,
    getSingle,
    getSingleByName,
    createCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=categoriesService.js.map