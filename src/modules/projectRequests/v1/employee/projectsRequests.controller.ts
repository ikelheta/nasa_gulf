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
import Employee from "../../../employees/v1/employees.model";
import Admin from "../../../admins/v1/admins.model";
import Consultant from "../../../consultant/v1/consultant.model";
import Contractor from "../../../contractor/v1/contractor.model";
import Project from "../../../project/v1/projects.model";

export async function create(req: AuthenticationRequest, res: Response) {
  validateUpdateProjectRequest(req.body);
  const { projectId } = req.body;
  // validate contractor
  const project = await projectsService.findByIdOrThrowError(projectId);
  req.body.code = `${project.code}-${req.body.type}`;
  req.body.createdByEmployee = req.user.id;
  const data = await projectRequestServ.createOne(req.body);
  res.json({
    data,
    message: null,
  });
}
export async function update(req: AuthenticationRequest, res: Response) {
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
export async function findOne(req: AuthenticationRequest, res: Response) {
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
            attributes: ["id", "nameEn", "nameAr", "image"],
          },
          {
            model: Contractor,
            as: "subContractors",
            attributes: ["id", "nameEn", "nameAr", "image"],
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
  const { projectId } = req.query;
  const employeeId = req.user.id;
  const projects = await projectsService.findAll({
    where: { managerId: employeeId },
    attributes: ["id"],
  });
  const projectIds = projects.map((ele) => ele.id);
  let filter: any = {
    [Op.or]: [
      { createdByEmployee: employeeId },
      { projectId: { [Op.in]: projectIds } },
    ],
  };
  if (projectId) {
    validateUUID(projectId as string);
    filter = {
      [Op.or]: [
        { createdByEmployee: employeeId, projectId },
        {
          projectId: { [Op.in]: projectIds.filter((ele) => ele == projectId) },
        },
      ],
    };
  }
  const data = await projectRequestServ.findAllAndCount({
    where: filter,
    order: [[orderBy, order]],
    limit,
    offset,
  });

  res.json({
    data,
    message: null,
  });
}
