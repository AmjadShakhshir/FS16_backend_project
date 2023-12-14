import express from "express";

import { getAllOrderItems } from "../controllers/orderItems/getAllOrderItems";

const orderItemsRouter = express.Router()

orderItemsRouter.get("/", getAllOrderItems)

export default orderItemsRouter