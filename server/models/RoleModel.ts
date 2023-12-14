import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      required: true,
    },
    permissions: {
      type: [String],
      enum: ["READ", "CREATE", "DELETE", "UPDATE"],
      required: true
    }
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Role", RoleSchema);
