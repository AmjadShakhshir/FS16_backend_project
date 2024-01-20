import express from "express";

import { createOrder } from "../controllers/checkout/createOrder";
import { newOrderSchema } from "../schemas/orderSchema";
import { validate } from "../middlewares/validate";
import { checkAuth } from "../middlewares/checkAuth";

const checkoutRouter = express.Router()

checkoutRouter.post("/", validate(newOrderSchema), createOrder)


export default checkoutRouter