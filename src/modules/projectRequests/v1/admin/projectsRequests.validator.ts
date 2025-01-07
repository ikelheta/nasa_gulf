import Joi from "joi";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";
import { ProjectRequestDomainTypes } from "../../../../shared/enums";
import ProjectRequest from "../projectsRequest.model";

export function validateCreateProjectRequest(body: object) {
  const schema = Joi.object({
    description: Joi.string(),
    images: Joi.array().items(Joi.string()
      .trim()
      .regex(/\.(jpg|jpeg|png|HEIF|svg)$/i)
      .messages({
        "string.base": "image must be a string.",
        "string.empty": "image cannot be empty.",
        "string.uri": "image must be a valid URI.",
        "string.pattern.base":
          "image must have a valid file extension (jpg, jpeg, png).",
        "any.required": "image is required and cannot be null.",
      })),
    type: Joi.string().valid(...Object.values(ProjectRequestDomainTypes)).required(),
    requestType: Joi.string().valid(...Object.values(ProjectRequest)).required(),
    projectId: Joi.string().uuid().required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateUpdateProjectRequest(body: object) {
  const schema = Joi.object({
    description: Joi.string(),
    images: Joi.array().items(Joi.string()
      .trim()
      .regex(/\.(jpg|jpeg|png|HEIF|svg)$/i)
      .messages({
        "string.base": "image must be a string.",
        "string.empty": "image cannot be empty.",
        "string.uri": "image must be a valid URI.",
        "string.pattern.base":
          "image must have a valid file extension (jpg, jpeg, png).",
        "any.required": "image is required and cannot be null.",
      })),
    type: Joi.string().valid(...Object.values(ProjectRequestDomainTypes)).required(),
    requestType: Joi.string().valid(...Object.values(ProjectRequest)).required(),
    projectId: Joi.string().uuid().required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
