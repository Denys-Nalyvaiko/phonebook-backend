import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import contactsRouter from "./routes/contactsRouter.js";
import { userRouter } from "./routes/usersRouter.js";

export const app = express();
dotenv.config();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
