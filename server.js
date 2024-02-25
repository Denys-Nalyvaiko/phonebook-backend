import { connectMongo } from "./db/mongoConnect.js";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectMongo();

    app.listen(PORT || 3000, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
