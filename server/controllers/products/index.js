"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addProduct_1 = require("./addProduct");
var deleteProduct_1 = require("./deleteProduct");
var getAllProducts_1 = require("./getAllProducts");
var updateProduct_1 = require("./updateProduct");
var getProduct_1 = require("./getProduct");
exports.default = {
    addProduct: addProduct_1.addProduct,
    deleteProduct: deleteProduct_1.deleteProduct,
    getAllProducts: getAllProducts_1.getAllProducts,
    updateProduct: updateProduct_1.updateProduct,
    getProduct: getProduct_1.getProduct,
};
