import Joi from "joi";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";

export function validateCreate(body: object) {
  const schema = Joi.object({
    location: Joi.string().max(512),
    name: Joi.string().max(512),

  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateUpdate(body: object) {
  const schema = Joi.object({
    location: Joi.string().max(512),
    name: Joi.string().max(512),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
export function validateAddToStock(body: object) {
  const schema = Joi.object({
    items: Joi.array().items(Joi.object({
      quantity : Joi.number().min(1).required(),
      id : Joi.string().uuid().required()
    })).required(),
    inventoryId : Joi.string().uuid().required()
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}