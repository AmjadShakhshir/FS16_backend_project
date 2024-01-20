import express from "express";

import { getAllOrderItems } from "../controllers/orderItems/getAllOrderItems";
import { checkAuth } from "../middlewares/checkAuth";

const orderItemsRouter = express.Router()

orderItemsRouter.get("/", checkAuth,getAllOrderItems)

export default orderItemsRouter