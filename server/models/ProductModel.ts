import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    images: {
      type: [String],
      required: true,
    },
    stock: Number,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Product", ProductSchema);
