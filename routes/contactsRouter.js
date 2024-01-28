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

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.post("/", validateBody(createContactSchema), addContact);

contactsRouter.put(
  "/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  renewContact
);

contactsRouter.delete("/:contactId", isValidId, deleteContact);

export default contactsRouter;
