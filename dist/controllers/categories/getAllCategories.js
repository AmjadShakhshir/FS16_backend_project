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
exports.getAllCategories = void 0;
const ApiError_1 = require("../../middlewares/errors/ApiError");
const categoriesService_1 = __importDefault(require("../../services/categoriesService"));
function getAllCategories(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield categoriesService_1.default.getAll();
        if (!categories) {
            next(ApiError_1.ApiError.resourceNotFound("Categories data not found"));
            return;
        }
        if (categories.length <= 0) {
            res.status(200).json({ msg: "No categories data yet" });
            return;
        }
        res.status(200).json(categories);
    });
}
exports.getAllCategories = getAllCategories;
//# sourceMappingURL=getAllCategories.js.map