"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addPayment_1 = require("./addPayment");
var getAllPayments_1 = require("./getAllPayments");
var getPayment_1 = require("./getPayment");
var removePayment_1 = require("./removePayment");
exports.default = {
    addPayment: addPayment_1.addPayment,
    removePayment: removePayment_1.removePayment,
    getPayment: getPayment_1.getPayment,
    getAllPayments: getAllPayments_1.getAllPayments,
};
