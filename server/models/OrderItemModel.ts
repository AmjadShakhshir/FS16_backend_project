import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("OrderItem", orderItemSchema);
