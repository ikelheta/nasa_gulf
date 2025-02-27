import Joi from "joi";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";

export function validateCreateProject(body: object) {
  const schema = Joi.object({
    location: Joi.string().max(255).required(),
    nameAr: Joi.string().max(255).required(),
    nameEn: Joi.string().max(255).required(),
    description: Joi.string(),
    managerId: Joi.string().required(),
    engineersIds : Joi.array().items(Joi.string()).unique(),
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
    code : Joi.string().max(255).required(),
    contractorId : Joi.string().uuid().required(),
    subCotractorId : Joi.array().items(Joi.string()).unique().required(),
    consultantId : Joi.string().uuid().required(),
    contract : Joi.string().max(255),
    clientName : Joi.string().max(255),

   
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateUpdateProject(body: object) {
  const schema = Joi.object({
    nameAr: Joi.string().max(255),
    nameEn: Joi.string().max(255),
    location: Joi.string().max(255),
    description: Joi.string(),
    managerId: Joi.string().required(),
    engineersIds : Joi.array().items(Joi.string()).unique(),
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
    code : Joi.string().max(255),
    contractorId : Joi.string().uuid().required(),
    subCotractorId : Joi.array().items(Joi.string()).unique().required(),
    consultantId : Joi.string().uuid().required(),
    contract : Joi.string().max(255),
    clientName : Joi.string().max(255),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
