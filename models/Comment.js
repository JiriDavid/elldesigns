import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: String, required: true },
    authorName: { type: String },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
