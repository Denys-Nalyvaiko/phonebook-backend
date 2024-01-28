import mongoose from "mongoose";
const { DB_HOST } = process.env;

export const connectMongo = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database is running");
  } catch (error) {
    console.log(error);
  }
};
