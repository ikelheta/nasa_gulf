import _ from "lodash";
import { NextFunction, Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import { comparePassword, validateUUID } from "../../../../shared/utils/general-functions";
import adminServ from "./admins.service";
import { AuthenticationRequest } from "../../../../shared/interfaces";
import { validateCreateAdmin, validateUpdateProfile } from "./admins.validator";
import { hashPassword } from "../../../../shared/utils/generalFunctions";
import { handlePaginationSort } from "../../../../shared/utils/handle-sort-pagination";
import { Op } from "sequelize";

export async function getProfile(
  req: AuthenticationRequest,
  res: Response,
) {
  console.log(req.user);
  const { id } = req.user;
  const attributes = ["id", "image", "name", "email"];
  const include: any[] = [];
  let admin: any = await adminServ.findById(id, { attributes, include });

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
  let admin: any = await adminServ.findById(id, { attributes });

  if (!admin) {
    throw new NotFoundError(`Account with id ${id} is not found`);
  }

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
    const existingAdmin = await adminServ.findOne({
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
export async function createAdmin(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  validateCreateAdmin(req.body);
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
    const existingAdmin = await adminServ.findOne({
      where: { email: req.body.email },
    });
    if (existingAdmin) {
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

  const one = await adminServ.createOne(req.body)
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
  const all = await adminServ.findAllAndCount({where : filter, limit, offset, order: [[orderBy, order]], attributes: { exclude: ["password"] } })
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
  const { id } = req.params
  validateUUID(id)
  const one = await adminServ.findByIdOrThrowError(id, { attributes: { exclude: ["password"] } })
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
  let admin: any = await adminServ.findById(id, { attributes });

  if (!admin) {
    throw new NotFoundError(`Account with id ${id} is not found`);
  }

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
    const existingAdmin = await adminServ.findOne({
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
  const updatedAdmin = await adminServ.update(req.body, { where: { id } })

  res.json({
    data: _.pick(updatedAdmin, ["id", "name", "email"]),
    message: null,
  });
}
export async function deleteOne(req: AuthenticationRequest,
  res: Response,
  next: NextFunction) {
    res.json({
      data : null,
      message : null
    })
}
