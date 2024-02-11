import HttpError from "../helpers/HttpError.js";
import * as userServices from "../services/userServices.js";
import gravatar from "gravatar";

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
