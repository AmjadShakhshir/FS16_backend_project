import mongoose from "mongoose";
import { z } from "zod";
import { shipmentBodySchema } from "./shipmentSchema";

export const paymentBodySchema = z
  .object({
    userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
    method: z.enum(["credit_card", "bank_transfer", "paypal"]),
    ordersId: z.array(
      z.string().refine((val) => mongoose.Types.ObjectId.isValid(val))
    ),
    bankName: z.string({
      required_error: "BankName  is required",
    }),
    accountNumber: z.string({
      required_error: "AccountNumber  is required",
    }),
    shipmentInfo: shipmentBodySchema,
  })
  .strict();


export const paymentSchema = z.object({
  body: paymentBodySchema,
});
