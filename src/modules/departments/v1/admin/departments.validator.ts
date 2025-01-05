import Joi from "joi";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";

export function validateCreateDepartment(body: object) {
  const schema = Joi.object({
    nameEn: Joi.string().max(255).required(),
    nameAr: Joi.string().max(255).required()
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateUpdateDepartment(body: object) {
  const schema = Joi.object({
    nameEn: Joi.string().max(255),
    nameAr: Joi.string().max(255),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
