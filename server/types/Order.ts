import { z } from "zod";

import { newOrderBodySchema, orderBodySchema } from "../schemas/orderSchema";

export type OrderDto = z.infer<typeof orderBodySchema>;
export type Order = OrderDto & { id: number };
export type UpdateOrderInput = Partial<OrderDto>;
export type newOrderData = z.infer<typeof newOrderBodySchema>;
