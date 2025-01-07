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
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { Op, Sequelize } from "sequelize";


export async function create(req: AuthenticationRequest, res: Response) {
  validateUpdateProjectRequest(req.body);
  const { projectId } = req.body
  // validate contractor
  const project = await projectsService.findByIdOrThrowError(projectId)
  req.body.code = `${project.code}-${req.body.type}`
  req.body.createdByEmployee = req.user.id
  const data = await projectRequestServ.createOne(req.body);
  res.json({
    data,
    message: null,
  });
}
export async function update(req: AuthenticationRequest, res: Response) {
  validateCreateProjectRequest(req.body);
  const { id } = req.params
  validateUUID(id)
  // validate contractor
  const data = await projectRequestServ.updateOneByIdOrThrowError(id, req.body);
  res.json({
    data,
    message: null,
  });
}
export async function findOne(req: AuthenticationRequest, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await projectRequestServ.findByIdOrThrowError(id, {});
  res.json({
    data,
    message: null,
  });
}
export async function deleteOne(req: AuthenticationRequest, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await projectRequestServ.delete({ where: { id } });
  res.json({
    data,
    message: null,
  });
}
export async function findAll(req: AuthenticationRequest, res: Response) {
  const { order, orderBy, limit, offset } = handlePaginationSort(req.query);
  const {id} = req.params
  const project = await projectsService.findByIdOrThrowError(id)
  const employeeId = req.user.id
  let filter : any = {
    projectId:  id
  }
  if(project.managerId != employeeId){
    filter.createdByEmployee = employeeId
  }
  console.log(filter);
  const data = await projectRequestServ.findAllAndCount({
    where: filter,
    order: [[orderBy, order]],
    limit,
    offset
  });

  res.json({
    data,
    message: null
  })

}