"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSingleUser_1 = require("./getSingleUser");
const deleteUser_1 = require("./deleteUser");
const updateUser_1 = require("./updateUser");
const getAllusers_1 = require("./getAllusers");
const signUp_1 = require("./signUp");
const logIn_1 = require("./logIn");
const googleLogIn_1 = require("./googleLogIn");
exports.default = {
    getAllUsers: getAllusers_1.getAllUsers,
    getSingleUser: getSingleUser_1.getSingleUser,
    deleteUser: deleteUser_1.deleteUser,
    updateUser: updateUser_1.updateUser,
    signUp: signUp_1.signUp,
    logIn: logIn_1.logIn,
    googleLogIn: googleLogIn_1.googleLogIn,
};
//# sourceMappingURL=index.js.map