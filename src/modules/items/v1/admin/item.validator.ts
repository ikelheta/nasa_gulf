import Joi from "joi";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";

export function validateCreate(body: object) {
  const schema = Joi.object({
    name: Joi.string().max(512).required(),
    unit: Joi.string().max(512).required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateUpdate(body: object) {
  const schema = Joi.object({
    name: Joi.string().max(512),
    unit: Joi.string().max(512),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
