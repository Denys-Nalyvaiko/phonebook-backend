import { getAll, createContact } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await getAll();
  res.json(result);
};

export const addContact = async (req, res) => {
  const result = await createContact(req.body);
  res.status(201).json(result);
};

export const deleteContact = (req, res) => {};
