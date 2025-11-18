import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: String },
    quantity: { type: Number, default: 1 },
    size: { type: String },
    color: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: ["new", "in-progress", "completed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
