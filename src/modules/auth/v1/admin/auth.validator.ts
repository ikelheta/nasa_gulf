import Joi from "joi";
import { PASSWORD_VALIDATION } from "../../../../shared/constant";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";
import { SystemUserTypes } from "../../../../shared/enums";

export function validateAdminLogin(body: object) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(PASSWORD_VALIDATION)
      .min(8)
      .required()
      .messages({
        "string.base": "Incorrect username or password",
        "string.empty": "Incorrect username or password",
        "string.min": "Incorrect username or password",
        "string.pattern.base": "Incorrect username or password",
        "any.required": "Incorrect username or password",
      }),
    type : Joi.string().valid(SystemUserTypes.Admin).required()
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateEmail(body: object) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateOtpValidation(body: object) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}

export function validateChangePasswordValidation(body: object) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    password: Joi.string()
      .regex(PASSWORD_VALIDATION)
      .min(8)
      .required()
      .messages({
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
      .required()
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
