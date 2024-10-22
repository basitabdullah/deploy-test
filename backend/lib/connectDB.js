import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To Mongo DB");
  } catch (error) {
    console.log("Error :", error.message);
  }
};
