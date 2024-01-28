import {
  getAll,
  createContact,
  removeContact,
} from "../services/contactsServices.js";
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
      throw HttpError(409, result.error.message);
    }
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) {
      throw HttpError(404, `Contact whit id ${contactId} is not found`);
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
