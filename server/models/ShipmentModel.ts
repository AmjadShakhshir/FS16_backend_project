import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ShipmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    street1: {
      type: String,
      required: true,
    },
    street2: {
      type: String,
      required: false,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Shipment", ShipmentSchema);
