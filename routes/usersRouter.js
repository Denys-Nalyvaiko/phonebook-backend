import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as userControllers from "../controllers/userControllers.js";
import * as userSchemas from "../schemas/userSchemas.js";

export const userRouter = express.Router();

userRouter.post(
  "/signup",
  validateBody(userSchemas.createUserSchema),
  userControllers.registerController
);

userRouter.post("/login");

userRouter.post("/logout");

userRouter.get("/current");
