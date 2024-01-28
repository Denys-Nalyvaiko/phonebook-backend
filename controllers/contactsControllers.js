import {
  getAll,
  createContact,
  removeContact,
  updateContact,
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
      throw HttpError(404, `Contact with id ${contactId} is not found`);
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const renewContact = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);

    if (!contact) {
      throw HttpError(
        404,
        `Contact with id ${req.params.contactId} is not found`
      );
    }
    return res.json(contact);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
