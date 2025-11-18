import mongoose, { Schema } from "mongoose";

const WishlistSchema = new Schema(
  {
    userId: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

WishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);
