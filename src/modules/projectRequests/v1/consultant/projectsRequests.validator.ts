import Joi from "joi";
import { UnprocessableEntityError } from "../../../../shared/utils/app-error";
import { ProjectRequestDomainTypes, ProjectRequestTypes } from "../../../../shared/enums";
import ProjectRequest from "../projectsRequest.model";


export function validateUpdateProjectRequest(body: object) {
  const schema = Joi.object({
    status : Joi.boolean().required(),
    consultantComment : Joi.string()
  });
  const { error } = schema.validate(body);
  if (error) {
    throw new UnprocessableEntityError(error.message);
  }
  return;
}
