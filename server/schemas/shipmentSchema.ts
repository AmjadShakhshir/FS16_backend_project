import mongoose from "mongoose";
import { z } from "zod";

export const shipmentBodySchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    street1: z.string(),
    street2: z.string().optional(),
    city: z.string(),
    zipCode: z.string(),
    state: z.string(),
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
    street1: z.string().optional(),
    street2: z.string().optional(),
    shippingPrice: z.number().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  })
  .partial()
  .strict();

export const updatedShipmentSchema = z.object({
  body: updatedShipmentBodySchema,
});
