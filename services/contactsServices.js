import { Contact } from "../db/models/contactModal.js";

export const getAll = async () => {
  const response = await Contact.find();
  return response;
};

export const createContact = async (data) => {
  const response = await Contact.create({ ...data });
  return response;
};
