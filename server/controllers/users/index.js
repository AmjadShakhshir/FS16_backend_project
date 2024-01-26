"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getSingleUser_1 = require("./getSingleUser");
var deleteUser_1 = require("./deleteUser");
var updateUser_1 = require("./updateUser");
var getAllusers_1 = require("./getAllusers");
var signUp_1 = require("./signUp");
var logIn_1 = require("./logIn");
var googleLogIn_1 = require("./googleLogIn");
exports.default = {
    getAllUsers: getAllusers_1.getAllUsers,
    getSingleUser: getSingleUser_1.getSingleUser,
    deleteUser: deleteUser_1.deleteUser,
    updateUser: updateUser_1.updateUser,
    signUp: signUp_1.signUp,
    logIn: logIn_1.logIn,
    googleLogIn: googleLogIn_1.googleLogIn,
};
