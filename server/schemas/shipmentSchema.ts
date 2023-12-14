import mongoose from "mongoose";
import { z } from "zod";

export const shipmentBodySchema = z
  .object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    shippingPrice: z.number(),
  })
  .strict();

export const shipmentSchema = z.object({
  body: shipmentBodySchema,
});

export const updatedShipmentBodySchema = z
  .object({
    userId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val))
      .optional(),
    address: z.string().optional(),
    shippingPrice: z.number().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  })
  .partial()
  .strict();

export const updatedShipmentSchema = z.object({
  body: updatedShipmentBodySchema,
});
