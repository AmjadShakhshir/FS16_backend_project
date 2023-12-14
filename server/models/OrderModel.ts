import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    shipmentId: {
      type: Schema.Types.ObjectId,
      ref: "Shipment",
    },
    shipmentStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Order", orderSchema);
