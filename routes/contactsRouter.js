import express from "express";
import {
  getAllContacts,
  addContact,
  deleteContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.post("/", addContact);

contactsRouter.delete("/:contactId", deleteContact);

export default contactsRouter;
