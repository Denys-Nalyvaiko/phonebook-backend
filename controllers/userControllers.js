import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import HttpError from "../helpers/HttpError.js";
import * as userServices from "../services/userServices.js";
import { User } from "../db/models/usersModel.js";

export const registerController = async (req, res, next) => {
  const { email, name } = req.body;

  try {
    const user = await userServices.checkIfUserExists(email);

    if (user) {
      throw HttpError(409, "User with this email exists");
    }

    const avatarURL = gravatar.url(email);

    const newUser = await userServices.createUser({
      ...req.body,
      avatarURL,
    });

    res
      .status(201)
      .json({ user: { name, email, avatarURL }, token: newUser.token });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userServices.checkIfUserExists(email);

    if (!user) {
      throw HttpError(401, "Invalid email or password");
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      throw HttpError(401, "Invalid email or password");
    }

    const newUser = await userServices.loginUser(user._id);

    res.json({
      user: { name: newUser.name, email, avatarURL: newUser.avatarURL },
      token: newUser.token,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    await userServices.logoutUser(req.user._id);

    res.json({ message: "User logout success" });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserController = async (req, res, next) => {
  try {
    const { name, email, avatarURL } = req.user;

    res.json({ name, email, avatarURL });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;

    if (!req.file) {
      throw HttpError(400, "You must upload avatar");
    }

    const { path: tempPath, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;

    const avatarDir = path.resolve("public", "avatar");
    const resultDir = path.resolve(avatarDir, fileName);

    await fs.rename(tempPath, resultDir);

    const avatarURL = path.join("avatar", fileName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

export const updateName = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(_id, { name }, { new: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
};
