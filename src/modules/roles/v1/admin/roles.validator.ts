import Joi from "joi";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";

export function validateCreateRole(body: object) {
  const schema = Joi.object({
    nameEn: Joi.string().max(255).required(),
    nameAr: Joi.string().max(255).required(),
    departmentId : Joi.string().uuid().required()

  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateUpdateRole(body: object) {
  const schema = Joi.object({
    nameEn: Joi.string().max(255),
    nameAr: Joi.string().max(255),
    departmentId : Joi.string().uuid()
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
