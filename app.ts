import express from "express";
import passport from "passport";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import productsRouter from "./server/routes/productsRouter";
import categoriesRouter from "./server/routes/categoriesRouter";
import ordersRouter from "./server/routes/ordersRouter";
import usersRouter from "./server/routes/usersRouter";
import checkoutRouter from "./server/routes/checkoutRouter";
import orderItemsRouter from "./server/routes/orderItemsRouter";
import paymentsRouter from "./server/routes/paymentsRouter";
import { loggingMiddleware } from "./server/middlewares/logging";
import { apiErrorHandler } from "./server/middlewares/apiErrorHandler";
import { routeNotFound } from "./server/middlewares/routeNotFound";
import { authWithGoogle } from "./server/middlewares/authWithGoogle";

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

app.use("/products", loggingMiddleware, productsRouter);
app.use("/categories", loggingMiddleware, categoriesRouter);
app.use("/orders", loggingMiddleware, ordersRouter);
app.use("/users", loggingMiddleware, usersRouter);
app.use("/checkout", loggingMiddleware, checkoutRouter);
app.use("/items", loggingMiddleware, orderItemsRouter);
app.use("/payments", loggingMiddleware, paymentsRouter);

app.use(apiErrorHandler);
app.use(routeNotFound);

const port = process.env.PORT || 5000;

const mongoURL = process.env.DB_URL_COMMON as string;
mongoose.connect(mongoURL).then(() => console.log("Connected!"));

app.listen(port, () => {
    console.log(`👀 Server is running on localhost:${port}`);
});

export default app