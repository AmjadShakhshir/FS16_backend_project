import express from "express";
import passport from "passport";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

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
app.use(cors({ origin: 'https://fs16-front-end-fs-two.vercel.app' }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use(authWithGoogle());

app.use("/products", loggingMiddleware, productsRouter);
app.use("/categories", loggingMiddleware, categoriesRouter);
app.use("/orders", loggingMiddleware, ordersRouter);
app.use("/users", loggingMiddleware, usersRouter);
app.use("/checkout", loggingMiddleware, checkoutRouter);
app.use("/items", loggingMiddleware, orderItemsRouter);
app.use("/payments", loggingMiddleware, paymentsRouter);

app.use(apiErrorHandler);
app.use(routeNotFound);

export default app