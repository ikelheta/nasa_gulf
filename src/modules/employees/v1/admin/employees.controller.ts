import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import { comparePassword, validateUUID } from "../../../../shared/utils/general-functions";
import employeeServ from "./employees.service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import { validateCreateEmployee, validateUpdateProfile } from "./employees.validator";
import { hashPassword } from "../../../../shared/utils/generalFunctions";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import Role from "../../../roles/v1/roles.model";
import Department from "../../../departments/v1/departments.model";


export async function getProfile(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  const attributes = ["id", "image", "name", "email"];
  const include: any[] = [];
  let one: any = await employeeServ.findById(id, { attributes, include });

  if (!one) {
    throw new NotFoundError(`Account with id ${id} is not found`);
  }

  res.json({ data: one, message: null });
}

export async function updateProfile(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  validateUpdateProfile(req.body);
  const { id } = req.user;
  const attributes = ["id", "image", "name", "email", "password"];
  let one: any = await employeeServ.findById(id, { attributes });

  if (!one) {
    throw new NotFoundError(`Account with id ${id} is not found`);
  }

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
    const existingOne = await employeeServ.findOne({
      where: { email: req.body.email },
    });
    if (existingOne && existingOne.id !== id) {
      throw new BadRequestError(
        `Account with email ${req.body.email} already exists`
      );
    }
  }

  if (req.body.password || req.body.confirmPassword) {
    if (req.body.password !== req.body.confirmPassword) {
      throw new UnprocessableEntityError(
        "Password and confirmPassword don't match"
      );
    }
    const isMatch = await comparePassword(req.body.password, one.password);
    if (!isMatch) {
      req.body.passwordChangedAt = new Date();
    }
  }
 
  res.json({
    data: _.pick(one, ["id", "name", "email"]),
    message: null,
  });
}
export async function createEmployee(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  validateCreateEmployee(req.body);
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
    const existing = await employeeServ.findOne({
      where: { email: req.body.email },
    });
    if (existing) {
      throw new BadRequestError(
        `Account with email ${req.body.email} already exists`
      );
    }
  }

  if (req.body.password || req.body.confirmPassword) {
    if (req.body.password !== req.body.confirmPassword) {
      throw new UnprocessableEntityError(
        "Password and confirmPassword don't match"
      );
    }
  }

  const one = await employeeServ.createOne(req.body)
  res.json({
    data: one,
    message: null,

  })

}
export async function getAll(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  const { limit, offset, order, orderBy } = handlePaginationSort(req.query)
  const all = await employeeServ.findAllAndCount({ limit, offset, order: [[orderBy, order]], attributes: { exclude: ["password"] } })
  res.json({
    data: all,
    message: null,

  })

}
export async function getOne(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  const {id} =  req.params
  validateUUID(id)
  const one = await employeeServ.findByIdOrThrowError(id, {include: [{
    model : Role,
    attributes : ["id", "nameEn", "nameAr"],
    include: [
      {
        model : Department,
        attributes: ["id", "nameEn", "nameAr"]
      }
    ]
  }]})
  res.json({
    data: one,
    message: null,

  })

}
export async function updateOne(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  validateUpdateProfile(req.body);
  const { id } = req.params;
  validateUUID(id)

  const attributes = ["id", "image", "name", "email", "password"];
  let admin: any = await employeeServ.findById(id, { attributes });

  if (!admin) {
    throw new NotFoundError(`Account with id ${id} is not found`);
  }

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
    const existingAdmin = await employeeServ.findOne({
      where: { email: req.body.email },
    });
    if (existingAdmin && existingAdmin.id !== id) {
      throw new BadRequestError(
        `Account with email ${req.body.email} already exists`
      );
    }
  }

  if (req.body.password || req.body.confirmPassword) {
    if (req.body.password !== req.body.confirmPassword) {
      throw new UnprocessableEntityError(
        "Password and confirmPassword don't match"
      );
    }
    const isMatch = await comparePassword(req.body.password, admin.password);
    if (!isMatch) {
      req.body.passwordChangedAt = new Date();
    }
   const hashed = await hashPassword(req.body.password)
   req.body.password = hashed
  }
  const updatedAdmin = await employeeServ.update(req.body, {where : {id}})

  res.json({
    data: _.pick(updatedAdmin, ["id", "name", "email"]),
    message: null,
  });
}
export async function deleteOne (req: AuthenticationRequest, res : Response){
  const {id} = req.params
  validateUUID(id)
  const data = await employeeServ.delete({
    where:  {id}
  })
  res.json({
    data,
    message : null
  })
}

