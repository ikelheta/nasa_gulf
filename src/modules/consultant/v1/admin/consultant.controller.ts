import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import { comparePassword, validateUUID } from "../../../../shared/utils/general-functions";
import consultantServ from "./consultant.service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import { validateCreateConsultant, validateUpdateProfile } from "./consultant.validator";
import { hashPassword } from "../../../../shared/utils/generalFunctions";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { Op } from "sequelize";

export async function getProfile(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  const attributes = ["id", "image", "name", "email"];
  const include: any[] = [];
  let admin: any = await consultantServ.findById(id, { attributes, include });

  if (!admin) {
    throw new NotFoundError(`Account with id ${id} is not found`);
  }

  res.json({ data: admin, message: null });
}

export async function updateProfile(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  validateUpdateProfile(req.body);
  const { id } = req.user;
  const attributes = ["id", "image", "name", "email", "password"];
  let admin: any = await consultantServ.findById(id, { attributes });

  if (!admin) {
    throw new NotFoundError(`Account with id ${id} is not found`);
  }

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
    const existingAdmin = await consultantServ.findOne({
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
  }

  res.json({
    data: _.pick(admin, ["id", "name", "email"]),
    message: null,
  });
}
export async function createConsultant(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  validateCreateConsultant(req.body);
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
    const existing = await consultantServ.findOne({
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

  const one = await consultantServ.createOne(req.body)
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
    const {search} = req.query
    let filter : any = {}
    if(search){
      filter.name = {[Op.iLike]: `%${search}%`}
    } 
  const all = await consultantServ.findAllAndCount({where : filter, limit, offset, order: [[orderBy, order]], attributes: { exclude: ["password"] } })
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
  const one = await consultantServ.findByIdOrThrowError(id, {attributes : {exclude : ["password"]}})
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
  const attributes = ["id", "image", "name", "email", "password"];
  let admin: any = await consultantServ.findById(id, { attributes });

  if (!admin) {
    throw new NotFoundError(`Account with id ${id} is not found`);
  }

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
    const existingAdmin = await consultantServ.findOne({
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
  const updatedAdmin = await consultantServ.update(req.body, {where : {id}})

  res.json({
    data: _.pick(updatedAdmin, ["id", "name", "email"]),
    message: null,
  });
}
