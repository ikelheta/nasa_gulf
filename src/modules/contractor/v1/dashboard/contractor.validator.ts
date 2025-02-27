import Joi from "joi";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";

export function validateCreateContractor(body: object) {
  const schema = Joi.object({
    nameEn: Joi.string().max(255).required(),
    nameAr: Joi.string().max(255).required(),
    image: Joi.string()
      .trim()
      .regex(/\.(jpg|jpeg|png|HEIF|svg)$/i)
      .messages({
        "string.base": "image must be a string.",
        "string.empty": "image cannot be empty.",
        "string.uri": "image must be a valid URI.",
        "string.pattern.base":
          "image must have a valid file extension (jpg, jpeg, png).",
        "any.required": "image is required and cannot be null.",
      }).required(),
    email: Joi.string().max(255).email(),
    phoneNumber: Joi.string().max(255),
    vatNumber: Joi.string().max(255),
    bankAccountNumber: Joi.string().max(255),
    authorizedLetter: Joi.string().max(255),
    typeOfWork: Joi.string().max(255),
   
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateUpdateContractor(body: object) {
  const schema = Joi.object({
    nameEn: Joi.string().max(255),
    nameAr: Joi.string().max(255),
    image: Joi.string()
      .trim()
      .regex(/\.(jpg|jpeg|png|HEIF|svg)$/i)
      .messages({
        "string.base": "image must be a string.",
        "string.empty": "image cannot be empty.",
        "string.uri": "image must be a valid URI.",
        "string.pattern.base":
          "image must have a valid file extension (jpg, jpeg, png).",
        "any.required": "image is required and cannot be null.",
      }),
    email: Joi.string().max(255).email(),
    phoneNumber: Joi.string().max(255),
    vatNumber: Joi.string().max(255),
    bankAccountNumber: Joi.string().max(255),
    authorizedLetter: Joi.string().max(255),
    typeOfWork: Joi.string().max(255),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
