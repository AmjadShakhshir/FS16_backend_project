import express from "express";
import passport from "passport";
import cors from "cors";

import productsRouter from "./routes/productsRouter";
import categoriesRouter from "./routes/categoriesRouter";
import ordersRouter from "./routes/ordersRouter";
import usersRouter from "./routes/usersRouter";
import checkoutRouter from "./routes/checkoutRouter";
import orderItemsRouter from "./routes/orderItemsRouter";
import paymentsRouter from "./routes/paymentsRouter";
import { loggingMiddleware } from "./middlewares/logging";
import { apiErrorHandler } from "./middlewares/apiErrorHandler";
import { routeNotFound } from "./middlewares/routeNotFound";
import { authWithGoogle } from "./middlewares/authWithGoogle";

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());
passport.use(authWithGoogle());

app.use("/api/v1/products", loggingMiddleware, productsRouter);
app.use("/api/v1/categories", loggingMiddleware, categoriesRouter);
app.use("/api/v1/orders", loggingMiddleware, ordersRouter);
app.use("/api/v1/users", loggingMiddleware, usersRouter);
app.use("/api/v1/checkout", loggingMiddleware, checkoutRouter);
app.use("/api/v1/items", loggingMiddleware, orderItemsRouter);
app.use("/api/v1/payments", loggingMiddleware, paymentsRouter);

app.use(apiErrorHandler);
app.use(routeNotFound);

export default app