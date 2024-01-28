import { getAll, createContact } from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await getAll();
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const result = await createContact(req.body);
    if (result.error) {
      next(HttpError(409, result.error.message));
    }
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteContact = (req, res) => {};
