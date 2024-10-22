import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    required: [true, "Please enter your name!"],
    type: String,
  },
  email: {
    required: [true, "Please enter your email!"],
    unique: true,
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  cartItems: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
});

// we have to hash the password

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

export const User = mongoose.model("User", userSchema);
