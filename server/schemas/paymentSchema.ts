import mongoose from "mongoose";
import { z } from "zod";
import { shipmentBodySchema } from "./shipmentSchema";

export const paymentBodySchema = z
  .object({
    userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
    method: z.enum(["credit_card", "bank_transfer", "paypal"]),

    bankName: z.string({
      required_error: "BankName  is required",
    }),
    accountNumber: z.string({
      required_error: "AccountNumber  is required",
    }),
    shipmentInfo: shipmentBodySchema,
    amount: z.number({
      required_error: "Amount  is required",
    }),
  })
  .strict();


export const paymentSchema = z.object({
  body: paymentBodySchema,
});
