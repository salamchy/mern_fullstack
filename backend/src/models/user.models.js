import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    select: false,
    required: true,
  },

  role: {
    type: String,
    default: "user",
  },

  profileImage: String,

  bio: {
    type: String,
    maxlength: 200,
  },

  profession: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("UserModel", userSchema);
