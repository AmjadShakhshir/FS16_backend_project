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
exports.deleteCategory = void 0;
const ApiError_1 = require("../../middlewares/errors/ApiError");
const categoriesService_1 = __importDefault(require("../../services/categoriesService"));
function deleteCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.categoryId;
        const deletedCategory = yield categoriesService_1.default.deleteCategory(id);
        if (deletedCategory === null) {
            next(ApiError_1.ApiError.resourceNotFound("Category can't be deleted: categoryId not found"));
            return;
        }
        res.status(200).json({ message: "Category successfully deleted" });
    });
}
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=deleteCategory.js.map