import Joi from "joi";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";

export function validateUpdateAdmin(body: object) {
  const schema = Joi.object({
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
    name: Joi.string().max(255),
    email: Joi.string().max(255).email(),
    password: Joi.string().regex(PASSWORD_VALIDATION).min(8).max(191).messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character.",
      "any.required": "Password is required and cannot be null.",
    }),
    confirmPassword: Joi.string()
      .regex(PASSWORD_VALIDATION)
      .min(8)
      .max(191)
      .messages({
        "string.base": "confirmPassword must be a string.",
        "string.empty": "confirmPassword cannot be empty.",
        "string.min": "confirmPassword must be at least 8 characters long.",
        "string.pattern.base":
          "confirmPassword must contain at least one uppercase letter, one lowercase letter, and one special character.",
        "any.required": "confirmPassword is required and cannot be null.",
      }),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateUpdateProfile(body: object) {
  const schema = Joi.object({
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
    name: Joi.string().max(255),
    email: Joi.string().max(255).email(),
    password: Joi.string().regex(PASSWORD_VALIDATION).min(8).messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character.",
      "any.required": "Password is required and cannot be null.",
    }),
    confirmPassword: Joi.string().regex(PASSWORD_VALIDATION).min(8).messages({
      "string.base": "confirmPassword must be a string.",
      "string.empty": "confirmPassword cannot be empty.",
      "string.min": "confirmPassword must be at least 8 characters long.",
      "string.pattern.base":
        "confirmPassword must contain at least one uppercase letter, one lowercase letter, and one special character.",
      "any.required": "confirmPassword is required and cannot be null.",
    }),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
export function validateCreateAdmin(body: object) {
  const schema = Joi.object({
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
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().regex(PASSWORD_VALIDATION).min(8).max(191).messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character.",
      "any.required": "Password is required and cannot be null.",
    }).required(),
    confirmPassword: Joi.string()
      .regex(PASSWORD_VALIDATION)
      .min(8)
      .max(191)
      .messages({
        "string.base": "confirmPassword must be a string.",
        "string.empty": "confirmPassword cannot be empty.",
        "string.min": "confirmPassword must be at least 8 characters long.",
        "string.pattern.base":
          "confirmPassword must contain at least one uppercase letter, one lowercase letter, and one special character.",
        "any.required": "confirmPassword is required and cannot be null.",
      }).required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
