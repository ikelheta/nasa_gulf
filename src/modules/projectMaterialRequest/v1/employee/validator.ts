import Joi from "joi";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";

export function validateCreate(body: object) {
  const schema = Joi.object({
    projectId: Joi.string().uuid().required(),
    items: Joi.array().items(Joi.object({
      id: Joi.string().uuid().required(),
      quantity: Joi.number().min(1)
    })).min(1).required()
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateUpdate(body: object) {
  const schema = Joi.object({
    projectId: Joi.string().uuid().required(),
    items: Joi.array().items(Joi.object({
      id: Joi.string().uuid().required(),
      quantity: Joi.number().min(1)
    })).min(1).required()
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
export function validateAcceptRequest(body: object) {
  const schema = Joi.object({
    inventoryId : Joi.string().uuid().required(),
    items: Joi.array().items(Joi.object({
      id: Joi.string().uuid().required(),
      quantity: Joi.number().min(0)
    })).min(1).required()
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
