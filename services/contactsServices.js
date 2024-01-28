import { Contact } from "../db/models/contactModal.js";

export const getAll = async () => {
  const response = await Contact.find();
  return response;
};

export const createContact = async (data) => {
  const isContactExist = await Contact.findOne({ number: data.number });

  if (isContactExist) {
    return {
      error: {
        message: "Contact with this number is already exist",
      },
    };
  }

  const response = await Contact.create({ ...data });
  return response;
};

export const removeContact = async (id) => {
  const response = await Contact.findByIdAndDelete(id);
  return response;
};
