"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const validate_1 = require("../middlewares/validate");
const userSchema_1 = require("../schemas/userSchema");
const emailChecker_1 = require("../middlewares/emailChecker");
const checkAuth_1 = require("../middlewares/checkAuth");
const checkRoles_1 = require("../middlewares/checkRoles");
const role_1 = require("../utils/role");
const passport_1 = __importDefault(require("passport"));
const checkPermissions_1 = require("../middlewares/checkPermissions");
const usersRouter = express_1.default.Router();
usersRouter.get("/", users_1.default.getAllUsers);
usersRouter.get("/profile/:userId", checkAuth_1.checkAuth, users_1.default.getSingleUser);
usersRouter.put("/:userId", (0, validate_1.validate)(userSchema_1.updateUserSchema), emailChecker_1.emailChecker, checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN), (0, checkPermissions_1.checkPermission)("UPDATE"), users_1.default.updateUser);
usersRouter.delete("/:userId", checkAuth_1.checkAuth, (0, checkRoles_1.checkRoles)(role_1.ROLE.ADMIN), (0, checkPermissions_1.checkPermission)("DELETE"), users_1.default.deleteUser);
usersRouter.post("/signup", emailChecker_1.emailChecker, users_1.default.signUp);
usersRouter.post("/login", users_1.default.logIn);
usersRouter.post("/login-google", passport_1.default.authenticate("google-id-token", { session: false }), users_1.default.googleLogIn);
exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map