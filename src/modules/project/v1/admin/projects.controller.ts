import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import projectServ from "./projects.service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import {
  validateUpdateProject,
  validateCreateProject,
} from "./projects.validator";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { validateUUID } from "../../../../shared/utils/general-functions";
import Contractor from "../../../contractor/v1/contractor.model";
import contractorService from "../../../contractor/v1/dashboard/contractor.service";
import { Op } from "sequelize";
import employeesService from "../../../employees/v1/admin/employees.service";
import Employee from "../../../employees/v1/employees.model";
import Consultant from "../../../consultant/v1/consultant.model";
import consultantService from "../../../consultant/v1/admin/consultant.service";
import ProjectRequest from "../../../projectRequests/v1/projectsRequest.model";

export async function findAll(req: Request, res: Response) {
  const { order, orderBy, limit, offset } = handlePaginationSort(req.query);
  const attributes = [
    "id",
    "nameEn",
    "nameAr",
    "image",
    "description",
    "code",
    "location",
    "createdAt",
  ];
  const data = await projectServ.findAllAndCount({
    where: {},
    attributes,
    order: [[orderBy, order]],
    limit,
    offset,
    include: [
      {
        model: Contractor,
        as: "mainContractor",
      },
      {
        model: Employee,
        as: "manager",
      },
      {
        model: Consultant,
        as: "consultant",
      },
    ],
  });
  res.json({
    data,
    message: null,
  });
}
export async function create(req: Request, res: Response) {
  validateCreateProject(req.body);
  const {subCotractorId, contractorId, managerId, engineersIds, consultantId} = req.body
  // validate contractor
  await contractorService.findByIdOrThrowError(contractorId)
  await consultantService.findByIdOrThrowError(consultantId, {})
  const contractorCount = await contractorService.count({where : {id : {[Op.in]: subCotractorId}}})
  if(contractorCount != subCotractorId.length){
    throw new BadRequestError("Contractor not exist")
  }
  //validate engineer
  await employeesService.findByIdOrThrowError(managerId, {})
  const count = await employeesService.count({where : {id : {[Op.in]: engineersIds}}})
  if(count != engineersIds.length){
    throw new BadRequestError("Contractor not exist")
  }
  const data = await projectServ.createOne(req.body);
  res.json({
    data,
    message: null,
  });
}
export async function update(req: Request, res: Response) {
  validateCreateProject(req.body);
  const {id} = req.params
  validateUUID(id)
  const {subCotractorId, contractorId, managerId, engineersIds} = req.body

   // validate contractor
   await contractorService.findByIdOrThrowError(contractorId)
   const contractorCount = await contractorService.count({where : {id : {[Op.in]: subCotractorId}}})
   if(contractorCount != subCotractorId.length){
     throw new BadRequestError("Contractor not exist")
   }
   //validate engineer
   await employeesService.findByIdOrThrowError(managerId, {})
   const count = await employeesService.count({where : {id : {[Op.in]: engineersIds}}})
   if(count != engineersIds.length){
     throw new BadRequestError("Contractor not exist")
   }
  const data = await projectServ.updateOneById(id, req.body);
  res.json({
    data,
    message: null,
  });
}
export async function findOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const include = [
    {
      model: Contractor,
      as: "mainContractor",
    },
    {
      model: Contractor,
      as: "subContractors",
    },
    {
      model: Employee,
      as: "manager",
      attributes : ["id", "name", "email", "image" ]

    },
    {
      model: Employee,
      as: "engineers",
      attributes : ["id", "name", "email", "image" ]

    },
    {
      model: Consultant,
      as: "consultant",
      attributes : ["id", "name", "email", "image" ]
    },
    {
      model: ProjectRequest,
    },
  ]
  const data = await projectServ.findByIdOrThrowError(id, {include});
  res.json({
    data,
    message: null,
  });
}
export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  validateUUID(id);
  const data = await projectServ.delete({ where: { id } });
  res.json({
    data,
    message: null,
  });
}
