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
exports.createCategory = void 0;
const ApiError_1 = require("../../middlewares/errors/ApiError");
const categoriesService_1 = __importDefault(require("../../services/categoriesService"));
function createCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const createData = req.body;
        const category = yield categoriesService_1.default.getSingleByName(createData.name);
        if (category !== null) {
            next(ApiError_1.ApiError.badRequest("The category with the same name already exists"));
            return;
        }
        const newCategory = yield categoriesService_1.default.createCategory(createData);
        res
            .status(201)
            .json({
            message: "Category successfully created",
            newCategory,
        });
    });
}
exports.createCategory = createCategory;
//# sourceMappingURL=createCategory.js.map