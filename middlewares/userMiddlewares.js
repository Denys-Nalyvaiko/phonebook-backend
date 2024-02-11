import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import HttpError from "../helpers/HttpError.js";
import { User } from "../db/models/usersModel.js";

dotenv.config();

const { SECRET_KEY } = process.env;

export const checkIfValidToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [type, token] = authorization.split(" ");

  try {
    if (type !== "Bearer") {
      throw HttpError(401);
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user && !user.token && token !== user.token) {
      throw HttpError(401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
