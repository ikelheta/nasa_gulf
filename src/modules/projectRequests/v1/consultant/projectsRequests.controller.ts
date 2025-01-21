import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import projectRequestServ from "./projectsRequests.service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import { validateUpdateProjectRequest } from "./projectsRequests.validator";
import { validateUUID } from "../../../../shared/utils/general-functions";

import projectsService from "../../../project/v1/admin/projects.service";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { Op, Sequelize } from "sequelize";
import Project from "../../../project/v1/projects.model";

export async function update(req: AuthenticationRequest, res: Response) {
  validateUpdateProjectRequest(req.body);
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
  const { projectId } = req.query;
  let filter: any = {};
  const consultantId = req.user.id;

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
        where: {
          consultantId,
        },
        required: true,
      },
    ],
  });

  res.json({
    data,
    message: null,
  });
}
