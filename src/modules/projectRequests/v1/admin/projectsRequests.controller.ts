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
import Project from "../../../project/v1/projects.model";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import Admin from "../../../admins/v1/admins.model";
import Employee from "../../../employees/v1/employees.model";
import Contractor from "../../../contractor/v1/contractor.model";
import Consultant from "../../../consultant/v1/consultant.model";

export async function create(req: AuthenticationRequest, res: Response) {
  validateUpdateProjectRequest(req.body);
  const { projectId } = req.body;
  // validate contractor
  const project = await projectsService.findByIdOrThrowError(projectId);
  req.body.code = `${project.code}-${req.body.type}`;
  req.body.createdByAdmin = req.user.id;
  const data = await projectRequestServ.createOne(req.body);
  res.json({
    data,
    message: null,
  });
}
export async function update(req: Request, res: Response) {
  validateCreateProjectRequest(req.body);
  const { id } = req.params;
  validateUUID(id);
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
  const data = await projectRequestServ.findByIdOrThrowError(id, {
    include: [
      { model: Employee, attributes: ["id", "name", "image"] },
      { model: Admin, attributes: ["id", "name", "image"] },
      {
        model: Project,
        include: [
          {
            model: Contractor,
            as: "mainContractor",
            attributes: ["id", "nameEn", "nameAr","image"],
          },
          {
            model: Contractor,
            as: "subContractors",
            attributes: ["id", "nameEn", "nameAr","image"],
          },
          {
            model: Consultant,
            as : 'consultant',

            attributes: ["id", "name", "image"],
          },
        ],
      },
    ],
  });
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
export async function findAll(req: AuthenticationRequest, res: Response) {
  const { order, orderBy, limit, offset } = handlePaginationSort(req.query);
  const { projectId } = req.query;
  let filter: any = {};
  if (projectId) {
    validateUUID(projectId as string);
    await projectsService.findByIdOrThrowError(projectId as string);
    filter.projectId = projectId;
  }

  const data = await projectRequestServ.findAllAndCount({
    where: filter,
    order: [[orderBy, order]],
    limit,
    offset,
    include: [
      {
        model: Project,
        attributes: ["id", "nameEn", "nameAr"],
      },
    ],
  });

  res.json({
    data,
    message: null,
  });
}
