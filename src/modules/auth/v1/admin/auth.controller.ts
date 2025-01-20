import { NextFunction, Request, Response } from "express";

import { QueryTypes } from "sequelize";
import sequelize from "../../../../config/db/config";
import {
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
} from "../../../../shared/utils/app-error";
import {
  comparePassword,
  generateRandomDigitNumber,
  hashString,
  isUUID,
} from "../../../../shared/utils/general-functions";
import adminServ from "../../../admins/v1/admin/admins.service";
import authServ from "./auth.services"
// import { OtpService } from "../../../otp/v1/dashboard/otp.service";
import _ from "lodash";
import { validateUpdateAdmin } from "../../../admins/v1/admin/admins.validator";
import {
  validateAdminLogin,
  validateChangePasswordValidation,
  validateEmail,
  validateOtpValidation,
} from "./auth.validator";
import { sendEmail } from "../../../../shared/utils/communication-functions";
import otpServ from "../../../otp/v1/dashboard/otp.service";
import { generateToken } from "../../../../shared/utils/jwt";
import { SystemUserTypes } from "../../../../shared/enums";


export async function loginAdmin(req : Request, res : Response) {
    validateAdminLogin(req.body)
    const { email, password, type } = req.body
    const admin = await adminServ.findOne({ where: { email }})
    if(!admin){
      throw new BadRequestError('Invalid Email or Password')
    }
    const isMatch = await comparePassword(password, admin.password)
    if(!isMatch){
      throw new BadRequestError('Invalid Email or Password')
    }
    delete admin.password
    const token = generateToken(admin.id, SystemUserTypes.Admin)
    res.json({admin, token, type })
}
export async function forgetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateEmail(req.body);
  req.body.email = req.body.email.toLowerCase();
  const admin: any = await adminServ.findOne({
    where: { email: req.body.email },
    attributes: ["id", "email"],
  });
  if (!admin) {
    throw new NotFoundError("The email address is not exist");
  }
  const otp = generateRandomDigitNumber(6);
  otpServ.deletePermanently({
    where: {
      userId: admin.id,
    },
  });

  const created = await otpServ.createOne({
    otp,
    userId: admin.id,
    validTo: new Date(new Date().getTime() + 10 * 60 * 1000),
  });

  sendEmail(
    [admin.email],
    `Nasa Gulf OTP`,
    `<p>Your OTP is <b>${otp}</b></p>
      <p style="color: red;"><strong>OTP is valid for 10 minutes</strong></p>`
  );

  res.json({
    data: { message: "Please check your email" },
    message: null,
  });
}

export async function otpValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateOtpValidation(req.body);

  req.body.email = req.body.email.toLowerCase();
  const { email, otp } = req.body;
  const admin = await adminServ.findOne({
    where: {
      email,
    },
    attributes: ["id"],
  });
  if (!admin) {
    throw new NotFoundError("This email is not exist");
  }
  console.log(admin);
  console.log(await otpServ.findOne({}));
  const existingOtp = await otpServ.findOne({
    where: {
      userId: admin.id,
      otp,
    },
  });
  if (!existingOtp) {
    throw new UnprocessableEntityError(
      `The OTP is wrong, Please check it again`
    );
  }
  const otpExpiredDate: any = existingOtp.validTo;
  if (new Date(otpExpiredDate) < new Date()) {
    throw new UnprocessableEntityError("The OTP is expired");
  }

  res.json({
    data: { message: "OTP validation success" },
    message: null,
  });
}

export async function updatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  validateChangePasswordValidation(req.body);

  req.body.email = req.body.email.toLowerCase();
  const { email, password, confirmPassword, otp } = req.body;
  const admin = await adminServ.findOne({
    where: {
      email,
    },
    attributes: ["id", "password"],
  });
  if (!admin) {
    throw new NotFoundError("This email is not exist");
  }
  const existingOtp = await otpServ.findOne({
    where: {
      userId: admin.id,
      otp,
    },
  });
  if (!existingOtp) {
    throw new UnprocessableEntityError(
      `The OTP is wrong, Please check it again`
    );
  }
  const otpExpiredDate: any = existingOtp.validTo;
  if (new Date(otpExpiredDate) < new Date()) {
    throw new UnprocessableEntityError("The OTP is expired");
  }
  if (password != confirmPassword) {
    throw new UnprocessableEntityError(
      "Password and confirm password are not matched, check it again"
    );
  }

  const hashedPassword = await hashString(password);
  const updatedPassword: any = await adminServ.update(
    {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    },
    {
      where: {
        email,
      },
    }
  );
  otpServ.deletePermanently({
    where: {
      id: existingOtp.id,
    },
  });
  delete updatedPassword.password;
  res.json({ data: updatedPassword, message: null });
}
