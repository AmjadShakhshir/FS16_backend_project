import { z } from "zod";
import { paymentBodySchema } from "../schemas/paymentSchema";
import mongoose from "mongoose";

export type Payment = z.infer<typeof paymentBodySchema> 
   & {
    _id: mongoose.Types.ObjectId;
    status: "pending" | "completed" | "failed";
  };
export type createPaymentInput = z.infer<typeof paymentBodySchema>; 
