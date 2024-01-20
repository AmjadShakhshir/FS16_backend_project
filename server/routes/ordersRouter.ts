import { Router } from 'express';
import { getAllOrders } from '../controllers/orders/getAllOrders';
import { getSingleOrder } from '../controllers/orders/getSingleOrder';
import { deleteOrder } from '../controllers/orders/deleteOrder';
import { addOrder } from '../controllers/orders/addOrder';
import { updateOrder } from '../controllers/orders/updateOrder';
import { validate } from '../middlewares/validate';
import { orderSchema } from '../schemas/orderSchema';
import { checkAuth } from '../middlewares/checkAuth';
import { checkPermission } from '../middlewares/checkPermissions';
import { ROLE } from '../utils/role';
import { checkRoles } from '../middlewares/checkRoles';

const ordersRouter = Router();

ordersRouter.get(
    '/',
    checkAuth,
    checkRoles(ROLE.ADMIN),
    checkPermission("READ"),
    getAllOrders
);
ordersRouter.get(
    '/:orderId',
    checkAuth,
    getSingleOrder
);
ordersRouter.post(
    '/',
    validate(orderSchema),
    checkAuth,
    addOrder
);
ordersRouter.patch(
    "/:orderId",
    validate(orderSchema),
    checkAuth,
    updateOrder
);
ordersRouter.delete(
    "/:orderId",
    checkAuth,
    deleteOrder
);

export default ordersRouter;
