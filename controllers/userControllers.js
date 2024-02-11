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
