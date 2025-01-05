import _ from "lodash";
import { NextFunction, Response, Request } from "express";

import departmentServ from "./departments.service";
import {
  validateUpdateDepartment,
  validateCreateDepartment,
} from "./departments.validator";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { validateUUID } from "../../../../shared/utils/general-functions";

export async function findAll(req: Request, res: Response) {
  const { order, orderBy, limit, offset } = handlePaginationSort(req.query);
  const attributes = ["id", "nameEn", "nameAr", "createdAt"];
  const data = await departmentServ.findAllAndCount({
    where: {},
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
  validateCreateDepartment(req.body)
  const one = await departmentServ.createOne(req.body);
  res.json({
    data: one,
    message: null
  })

}

export async function update(req: Request, res: Response) {
  validateUpdateDepartment(req.body)
  const data = await departmentServ.createOne(req.body);
  res.json({
    data,
    message: null
  })
}
export async function findOne(req: Request, res: Response) {
  const { id } = req.params
  validateUUID(id)
  const data = await departmentServ.findByIdOrThrowError(id);
  res.json({
    data  ,
    message : null
  })
}
export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params
  validateUUID(id)
  const data = await departmentServ.delete({ where: { id } });
  res.json({
    data  ,
    message : null
  })
}


