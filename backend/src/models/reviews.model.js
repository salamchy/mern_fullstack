import mongoose from "mongoose";

export const ReviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productsModel",
    },
  },
  { timestamps: true }
);

export const ReviewModel = mongoose.model("ReviewModel", ReviewSchema);
