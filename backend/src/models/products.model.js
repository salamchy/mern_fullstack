import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: String,
  description: String,

  price: {
    type: Number,
    required: true,
  },

  oldPrice: Number,
  image: String,
  color: String,
  rating: String,

  rating: {
    type: Number,
    default: 0,
  },

  author: {
    type: mongoose.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
});

export const productsModel = mongoose.model("productsModel", productSchema);
