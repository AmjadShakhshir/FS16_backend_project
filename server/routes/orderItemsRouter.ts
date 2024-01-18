import express from "express";

import { getAllOrderItems } from "../controllers/orderItems/getAllOrderItems";
import { checkAuth } from "../middlewares/checkAuth";
import { checkRoles } from "../middlewares/checkRoles";
import { ROLE } from "../utils/role";

const orderItemsRouter = express.Router()

orderItemsRouter.get(
    "/",
    checkAuth,
    checkRoles(ROLE.ADMIN),
    getAllOrderItems
    )

export default orderItemsRouter