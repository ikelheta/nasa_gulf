import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import projectRequestServ from "./projectsRequests.service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import {
  validateUpdateProjectRequest,
  validateCreateProjectRequest,
} from "./projectsRequests.validator";
import { validateUUID } from "../../../../shared/utils/general-functions";

import projectsService from "../../../project/v1/admin/projects.service";


export async function create(req: AuthenticationRequest, res: Response) {
  validateUpdateProjectRequest(req.body);
  const {projectId} = req.body
  // validate contractor
  const project = await projectsService.findByIdOrThrowError(projectId)
  req.body.code = `${project.code}-${req.body.type}`
  req.body.createdByAdmin = req.user.id
  const data = await projectRequestServ.createOne(req.body);
  res.json({
    data,
    message: null,
  });
}
export async function update(req: Request, res: Response) {
  validateCreateProjectRequest(req.body);
  const {id} = req.params
  validateUUID(id)
   // validate contractor
  const data = await projectRequestServ.updateOneByIdOrThrowError(id, req.body);
  res.json({
    data,
    message: null,
  });
}
export async function findOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await projectRequestServ.findByIdOrThrowError(id, {});
  res.json({
    data,
    message: null,
  });
}
export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await projectRequestServ.delete({ where: { id } });
  res.json({
    data,
    message: null,
  });
}
