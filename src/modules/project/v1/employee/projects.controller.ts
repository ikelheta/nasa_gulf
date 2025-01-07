import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import projectServ from "./projects.service";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { validateUUID } from "../../../../shared/utils/general-functions";
import Contractor from "../../../contractor/v1/contractor.model";
import Employee from "../../../employees/v1/employees.model";
import Consultant from "../../../consultant/v1/consultant.model";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import { Op, Sequelize, where } from "sequelize";
import ProjectRequest from "../../../projectRequests/v1/projectsRequest.model";

export async function findAll(req: AuthenticationRequest, res: Response) {
  const {id} = req.user
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
    where: {[Op.or]: [
      {managerId : id},
      Sequelize.literal(
        `EXISTS (SELECT 1 FROM "project_engineers" WHERE "project_engineers"."projectId" = "projects"."id" AND "project_engineers"."engineerId" = '${id}')`
    )
    ]},
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
        model: Employee,
        as: "engineers",
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


export async function findOne(req: AuthenticationRequest, res: Response) {
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
      attributes: ["id", "name", "email", "image"]

    },
    {
      model: Employee,
      as: "engineers",
      attributes: ["id", "name", "email", "image"]

    },
    {
      model: Consultant,
      as: "consultant",
      attributes: ["id", "name", "email", "image"]
    },
    {
      model: ProjectRequest,
    },
  ]
  const data = await projectServ.findByIdOrThrowError(id, { include });
  res.json({
    data,
    message: null,
  });
}

