import _ from "lodash";
import { NextFunction, Response, Request } from "express";

import roleServ from "./roles.service";
import departmentServ from "../../../departments/v1/admin/departments.service"
import {
  validateUpdateRole,
  validateCreateRole,
} from "./roles.validator";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { validateUUID } from "../../../../shared/utils/general-functions";

export async function findAll(req: Request, res: Response) {
  const { order, orderBy, limit, offset } = handlePaginationSort(req.query);
  const {departmentId} = req.query
  let filter :any 
  if(departmentId){
    validateUUID(departmentId as string, "Invalid department id")
    filter.departmentId = departmentId
  }
  const attributes = ["id", "nameEn", "nameAr", "createdAt"];
  const data = await roleServ.findAllAndCount({
    where: filter,
    attributes,
    order: [[orderBy, order]],
    limit,
    offset
  });
  res.json({
    data,
    message: null
  })

}
export async function create(req: Request, res: Response) {
  validateCreateRole(req.body)
  const { departmentId } = req.body
  await departmentServ.findByIdOrThrowError(departmentId)
  const data = await roleServ.createOne(req.body);
  res.json({
    data,
    message: null
  })
}
export async function update(req: Request, res: Response) {
  validateUpdateRole(req.body)
  const data = await roleServ.createOne(req.body);
  res.json({
    data,
    message: null
  })
}
export async function findOne(req: Request, res: Response) {
  const { id } = req.params
  validateUUID(id)
  const data = await roleServ.findByIdOrThrowError(id);
  res.json({
    data,
    message: null
  })
}
export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params
  validateUUID(id)
  const data = await roleServ.delete({ where: { id } });
  res.json({
    data,
    message: null
  })
}


