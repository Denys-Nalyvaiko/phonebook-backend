import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as userControllers from "../controllers/userControllers.js";
import * as userSchemas from "../schemas/userSchemas.js";
import * as userMiddlewares from "../middlewares/userMiddlewares.js";

export const userRouter = express.Router();

userRouter.post(
  "/signup",
  validateBody(userSchemas.createUserSchema),
  userControllers.registerController
);

userRouter.post(
  "/login",
  validateBody(userSchemas.loginUserSchema),
  userControllers.loginController
);

userRouter.post(
  "/logout",
  userMiddlewares.checkIfValidToken,
  userControllers.logoutController
);

userRouter.get(
  "/current",
  userMiddlewares.checkIfValidToken,
  userControllers.getCurrentUserController
);
