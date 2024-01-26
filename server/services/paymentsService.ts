import mongoose from "mongoose";
import stripe from "stripe";

import OrderRepo from "../models/OrderModel";
import PaymentRepo from "../models/PaymentModel";
import UserRepo from "../models/UserModel";
import { createPaymentInput } from "../types/Payment";
import shipmentsService from "./shipmentsService";

const createOne = async (newPayment: createPaymentInput) => {
  const { userId, method, bankName, accountNumber, shipmentInfo } =
    newPayment;
  const user = await UserRepo.findById(userId);
  if (!user) {
    return null;
  }
      const paymentDate = new Date();
      const existingPayment = await PaymentRepo.findOne({
        userId,
      });
      if (!existingPayment) {
        const createdPayment = new PaymentRepo({
          userId,
          method,
          bankName,
          accountNumber,
          paymentDate,
        });
        const createdShipment = await shipmentsService.createShipment({
          ...shipmentInfo,
          userId: new mongoose.Types.ObjectId(userId),
        });
        await createdPayment.save();
        return {
          ...createdPayment.toObject(),
          shipment: createdShipment,
        };
      }
      existingPayment.method = method;
};

const removeOne = async (paymentId: string) => {
  return await PaymentRepo.findByIdAndDelete(paymentId);
};

const findOne = async (paymentId: string) => {
  return await PaymentRepo.findById(paymentId)
  .populate("userId");
};

const findAll = async () => {
  return await PaymentRepo.find()
  .populate("userId")
  .exec();
};

export default {
  removeOne,
  findOne,
  findAll,
  createOne
};
