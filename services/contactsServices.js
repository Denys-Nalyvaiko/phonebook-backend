import { Contact } from "../db/models/contactModal.js";

export const getAll = async (userId) => {
  const response = await Contact.find({ owner: userId });
  return response;
};

export const createContact = async (data, userId) => {
  const isContactExist = await Contact.findOne({
    number: data.number,
    owner: userId,
  });

  if (isContactExist) {
    return {
      error: {
        message: "Contact with this number is already exist",
      },
    };
  }

  const response = await Contact.create({ ...data, owner: userId });
  return response;
};

export const removeContact = async (id, userId) => {
  const response = await Contact.findOneAndDelete({ _id: id, owner: userId });
  return response;
};

export const updateContact = async (id, data, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    data,
    {
      new: true,
    }
  );
  return updatedContact;
};
