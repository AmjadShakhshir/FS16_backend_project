import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Category", CategorySchema);