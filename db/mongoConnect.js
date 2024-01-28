import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST } = process.env;

export const connectMongo = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database is running");
  } catch (error) {
    console.log(error);
  }
};
