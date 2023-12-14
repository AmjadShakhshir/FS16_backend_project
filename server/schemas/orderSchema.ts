import mongoose from "mongoose";
import { z } from "zod";

export const orderBodySchema = z.object({
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  totalAmount: z.number(),
});

export const orderSchema = z.object({
  body: orderBodySchema,
});

export const newOrderBodySchema = z.object({
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  products: z.array(
    z.object({
      productId: z
        .string()
        .refine((val) => mongoose.Types.ObjectId.isValid(val)),
      quantity: z.number(),
    })
  ),
});

export const newOrderSchema = z.object({
  body: newOrderBodySchema,
});
