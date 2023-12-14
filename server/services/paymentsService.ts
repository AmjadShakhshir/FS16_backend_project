import mongoose from "mongoose";
import OrderRepo from "../models/OrderModel";
import PaymentRepo from "../models/PaymentModel";
import UserRepo from "../models/UserModel";
import { createPaymentInput } from "../types/Payment";
import shipmentsService from "./shipmentsService";

const createOne = async (newPayment: createPaymentInput) => {
  const { userId, ordersId, method, bankName, accountNumber, shipmentInfo } =
    newPayment;
  const user = await UserRepo.findById(userId);
  if (!user) {
    return null;
  }
  const userOrders = await OrderRepo.find({ userId });
  const existingOrders = userOrders.filter((order) =>
    ordersId.includes(order._id.toString())
  );
  const createdPayments = await Promise.all(
    existingOrders.map(async (order) => {
      const paymentDate = new Date();
      const existingPayment = await PaymentRepo.findOne({
        userId,
        orderId: order._id,
      });
      if (!existingPayment) {
        const createdPayment = new PaymentRepo({
          userId,
          method,
          orderId: order._id,
          bankName,
          accountNumber,
          paymentDate,
        });
        const createdShipment = await shipmentsService.createShipment({
          ...shipmentInfo,
          userId: new mongoose.Types.ObjectId(userId),
        });
        await createdPayment.save();
        await OrderRepo.findByIdAndUpdate(order._id, {
          paymentStatus: "success",
          paymentId: createdPayment._id,
          shipmentId: createdShipment._id,
          shipmentStatus: "shipped",
        });
        return {
          ...createdPayment.toObject(),
          shipment: createdShipment,
        };
      }
    })
  );
  return createdPayments.filter(Boolean);
};

const removeOne = async (paymentId: string) => {
  return await PaymentRepo.findByIdAndDelete(paymentId);
};

const findOne = async (paymentId: string) => {
  return await PaymentRepo.findById(paymentId);
};

const findAll = async () => {
  return await PaymentRepo.find().exec();
};
export default { createOne, removeOne, findOne, findAll };
