import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import itemServ from "./item.service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import {
  validateUpdate,
  validateCreate,
} from "./item.validator";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { validateUUID } from "../../../../shared/utils/general-functions";
import { Op } from "sequelize";

export async function findAll(req: Request, res: Response) {
  const { order, orderBy, limit, offset } = handlePaginationSort(req.query);
  const { search } = req.query;
  let filter: any = {};
  if (search) {
    filter = {
      name : {[Op.iLike]:`%${search}%` }
    };
  }
  const data = await itemServ.findAllAndCount({
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
  const { name } = req.body;
  await itemServ.validateNameNotExistForCreate(name);

  const data = await itemServ.createOne(req.body);
  res.json({
    data,
    message: null,
  });
}
export async function update(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  validateUpdate(req.body);
  const { name } = req.body;

 
  if (name) {
    await itemServ.validateNameNotExistForUpdate(id, name);
  }

  const data = await itemServ.update(req.body, { where: { id } });
  res.json({
    data,
    message: null,
  });
}
export async function findOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await itemServ.findByIdOrThrowError(id);
  res.json({
    data,
    message: null,
  });
}
export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await itemServ.delete({ where: { id } });
  res.json({
    data,
    message: null,
  });
}
