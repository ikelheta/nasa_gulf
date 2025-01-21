import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import contractorServ from "./contractor.service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import {
  validateUpdateContractor,
  validateCreateContractor,
} from "./contractor.validator";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { validateUUID } from "../../../../shared/utils/general-functions";
import { Op } from "sequelize";

export async function findAll(req: Request, res: Response) {
  const { order, orderBy, limit, offset } = handlePaginationSort(req.query);
  const { search } = req.query;
  let filter: any = {};
  if (search) {
    filter = {
      [Op.or]: [
        { nameEn: { [Op.iLike]: `%${search}%` } },
        { nameAr: { [Op.iLike]: `%${search}%` } },
      ],
    };
  }
  const attributes = ["id", "nameEn", "nameAr", "image", "email", "createdAt"];
  const data = await contractorServ.findAllAndCount({
    where: filter,
    attributes,
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
  validateCreateContractor(req.body);
  const { email, nameEn, nameAr } = req.body;
  await contractorServ.validateEmailNotExistForCreate(email);
  await contractorServ.validateNameNotExistForCreate(nameEn, nameAr);

  const data = await contractorServ.createOne(req.body);
  res.json({
    data,
    message: null,
  });
}
export async function update(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  validateUpdateContractor(req.body);
  const { email, nameEn, nameAr } = req.body;

  if (email) {
    await contractorServ.validateEmailNotExistForUpdate(email, id);
  }
  if (nameEn) {
    await contractorServ.validateNameEnNotExistForUpdate(nameEn, id);
  }
  if (nameAr) {
    await contractorServ.validateNameArNotExistForUpdate(nameAr, id);
  }

  const data = await contractorServ.update(req.body, { where: { id } });
  res.json({
    data,
    message: null,
  });
}
export async function findOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await contractorServ.findByIdOrThrowError(id);
  res.json({
    data,
    message: null,
  });
}
export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await contractorServ.delete({ where: { id } });
  res.json({
    data,
    message: null,
  });
}
