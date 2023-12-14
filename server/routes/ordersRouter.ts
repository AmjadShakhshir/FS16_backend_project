import { Router } from 'express';
import { getAllOrders } from '../controllers/orders/getAllOrders';
import { getSingleOrder } from '../controllers/orders/getSingleOrder';
import { deleteOrder } from '../controllers/orders/deleteOrder';
import { addOrder } from '../controllers/orders/addOrder';
import { updateOrder } from '../controllers/orders/updateOrder';
import { validate } from '../middlewares/validate';
import { orderSchema } from '../schemas/orderSchema';

const ordersRouter = Router();

ordersRouter.get('/', getAllOrders);
ordersRouter.get('/:orderId', getSingleOrder);
ordersRouter.post('/', validate(orderSchema), addOrder);
ordersRouter.patch("/:orderId", validate(orderSchema), updateOrder);
ordersRouter.delete("/:orderId", deleteOrder);

export default ordersRouter;
