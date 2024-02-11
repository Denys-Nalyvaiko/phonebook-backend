import express from "express";
import {
  getAllContacts,
  addContact,
  deleteContact,
  renewContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidId.js";
import * as userMiddlewares from "../middlewares/userMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/", userMiddlewares.checkIfValidToken, getAllContacts);

contactsRouter.post(
  "/",
  userMiddlewares.checkIfValidToken,
  validateBody(createContactSchema),
  addContact
);

contactsRouter.put(
  "/:contactId",
  userMiddlewares.checkIfValidToken,
  isValidId,
  validateBody(updateContactSchema),
  renewContact
);

contactsRouter.delete(
  "/:contactId",
  userMiddlewares.checkIfValidToken,
  isValidId,
  deleteContact
);

export default contactsRouter;
