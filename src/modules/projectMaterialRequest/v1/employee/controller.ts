import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import projectItemRequestServ from "./service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import { validateUpdate, validateCreate, validateAcceptRequest } from "./validator";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { validateUUID } from "../../../../shared/utils/general-functions";
import { Op } from "sequelize";
import projectsService from "../../../project/v1/admin/projects.service";
import itemService from "../../../items/v1/admin/item.service";
import Item from "../../../items/v1/item.model";
import Project from "../../../project/v1/projects.model";
import Admin from "../../../admins/v1/admins.model";
import Employee from "../../../employees/v1/employees.model";
import { ProjectMaterialRequestStatus } from "../../../../shared/enums";

export async function findAll(req: Request, res: Response) {
  const { order, orderBy, limit, offset } = handlePaginationSort(req.query);
  const { projectId } = req.query;
  let filter: any = {};
  if (projectId) {
    filter = {
      projectId,
    };
  }
  const data = await projectItemRequestServ.findAllAndCount({
    where: filter,
    include: [
      {
        model: Project,
        attributes: ["id", "nameEn", "nameAr"],
      },
      {
        model : Admin,
        attributes : ["id", "name", "image"]
      },
      {
        model : Employee,
        attributes : ["id", "name", "image"]
      },
    ],
    order: [[orderBy, order]],
    limit,
    offset,
  });
  res.json({
    data,
    message: null,
  });
}
export async function create(req: AuthenticationRequest, res: Response) {
  validateCreate(req.body);
  const { projectId, items } = req.body;
  await projectsService.findByIdOrThrowError(projectId);
  req.body.createdByEmployee = req.user.id;
  const existedItems = await itemService.count({
    where: { id: { [Op.in]: items.map((item) => item.id) } },
  });
  if (existedItems != items.length) {
    throw new BadRequestError("There is an item that is not exist");
  }

  const data = await projectItemRequestServ.createOne(req.body, items);
  res.json({
    data,
    message: null,
  });
}

export async function findOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await projectItemRequestServ.findByIdOrThrowError(id, {
    include: [
      {
        model: Item,
        attributes : ["id", "name", "unit"],
        through: { attributes: ["wantedQuantity", "deliveredQuantity"] },
      },
      {
        model: Project,
        attributes: ["id", "nameEn", "nameAr"],
      },
      {
        model : Admin,
        attributes : ["id", "name", "image"]
      },
      {
        model : Employee,
        attributes : ["id", "name", "image"]
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
  const data = await projectItemRequestServ.delete({ where: { id } });
  res.json({
    data,
    message: null,
  });
}
export async function acceptRequest(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  validateAcceptRequest(req.body)
  const data = await projectItemRequestServ.findByIdOrThrowError(id, {
    include: [
      {
        model: Item,
        attributes : ["id", "name", "unit"],
        through: { attributes: ["wantedQuantity", "deliveredQuantity"] },
      },
      {
        model: Project,
        attributes: ["id", "nameEn", "nameAr"],
      },
      {
        model : Admin,
        attributes : ["id", "name", "image"]
      },
      {
        model : Employee,
        attributes : ["id", "name", "image"]
      },
    ]
  });
  if(data.status != ProjectMaterialRequestStatus.PENDING){
    throw new BadRequestError("Material request already delivered and waiting for confirm")
  }
  await projectItemRequestServ.acceptRequest(req.body.items,req.body.inventoryId, id )
  await projectItemRequestServ.update({status : ProjectMaterialRequestStatus.DELIVERED}, {where : {id}})
  res.json({
    data,
    message: null,
  });
}