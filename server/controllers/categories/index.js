"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAllCategories_1 = require("./getAllCategories");
var getSingleCategory_1 = require("./getSingleCategory");
var createCategory_1 = require("./createCategory");
var updateCategory_1 = require("./updateCategory");
var deleteCategory_1 = require("./deleteCategory");
exports.default = {
    getAllCategories: getAllCategories_1.getAllCategories,
    getSingleCategory: getSingleCategory_1.getSingleCategory,
    createCategory: createCategory_1.createCategory,
    updateCategory: updateCategory_1.updateCategory,
    deleteCategory: deleteCategory_1.deleteCategory,
};
