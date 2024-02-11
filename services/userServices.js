import { User } from "../db/models/usersModel.js";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY } = process.env;

export const checkIfUserExists = async (email) => await User.findOne({ email });

export const createUser = async (userData) => {
  const user = new User({ ...userData });

  await user.hashPassword();

  await user.save();

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "5h" });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  return newUser;
};
