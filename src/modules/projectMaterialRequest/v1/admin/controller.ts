import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import projectItemRequestServ from "./service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import { validateUpdate, validateCreate } from "./validator";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { validateUUID } from "../../../../shared/utils/general-functions";
import { Op } from "sequelize";
import projectsService from "../../../project/v1/admin/projects.service";
import itemService from "../../../items/v1/admin/item.service";
import Item from "../../../items/v1/item.model";

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
    order: [[orderBy, order]],
    limit,
    offset,
  });
  res.json({
    data,
    message: null,
  });
}
export async function create(req: Request, res: Response) {
  validateCreate(req.body);
  const { projectId, items } = req.body
  await projectsService.findByIdOrThrowError(projectId)
  const existedItems = await itemService.count({ where: { id: { [Op.in]: items.map((item) => item.id) } } })
  if (existedItems != items.length) {
    throw new BadRequestError("There is an item that is not exist")
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
  const data = await projectItemRequestServ.findByIdOrThrowError(id, {include : [{model : Item}]});
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
