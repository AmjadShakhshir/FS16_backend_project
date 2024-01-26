"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = require("passport");
var cors_1 = require("cors");
var productsRouter_1 = require("./routes/productsRouter");
var categoriesRouter_1 = require("./routes/categoriesRouter");
var ordersRouter_1 = require("./routes/ordersRouter");
var usersRouter_1 = require("./routes/usersRouter");
var checkoutRouter_1 = require("./routes/checkoutRouter");
var orderItemsRouter_1 = require("./routes/orderItemsRouter");
var paymentsRouter_1 = require("./routes/paymentsRouter");
var logging_1 = require("./middlewares/logging");
var apiErrorHandler_1 = require("./middlewares/apiErrorHandler");
var routeNotFound_1 = require("./middlewares/routeNotFound");
var authWithGoogle_1 = require("./middlewares/authWithGoogle");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use((0, cors_1.default)());
passport_1.default.use((0, authWithGoogle_1.authWithGoogle)());
app.use("/products", logging_1.loggingMiddleware, productsRouter_1.default);
app.use("/categories", logging_1.loggingMiddleware, categoriesRouter_1.default);
app.use("/orders", logging_1.loggingMiddleware, ordersRouter_1.default);
app.use("/users", logging_1.loggingMiddleware, usersRouter_1.default);
app.use("/checkout", logging_1.loggingMiddleware, checkoutRouter_1.default);
app.use("/items", logging_1.loggingMiddleware, orderItemsRouter_1.default);
app.use("/payments", logging_1.loggingMiddleware, paymentsRouter_1.default);
app.use(apiErrorHandler_1.apiErrorHandler);
app.use(routeNotFound_1.routeNotFound);
// if (process.env.NODE_ENV === "production") {
//     app.get("*", (req, res) => {
//         app.use(express.static(path.join(__dirname, "frontend", "build")));
//         res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//     });
// }
exports.default = app;
