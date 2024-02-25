import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Name field is required" }),
  number: Joi.string()
    .required()
    .messages({ "any.required": "Number field is required" }),
  id: Joi.string(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  number: Joi.string(),
});
