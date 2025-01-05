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
// import { OtpService } from "../../../otp/v1/dashboard/otp.service";
import _ from "lodash";
import { validateUpdateAdmin } from "../../../admins/v1/admin/admins.validator";
import {
  validateEmployeeLogin,
  validateChangePasswordValidation,
  validateEmail,
  validateOtpValidation,
} from "./auth.validator";
import { sendEmail } from "../../../../shared/utils/communication-functions";
import otpServ from "../../../otp/v1/dashboard/otp.service";
import employeeServ from "../../../employees/v1/admin/employees.service";
import { generateToken } from "../../../../shared/utils/jwt";

export async function loginEmployee(req: Request, res: Response) {
  validateEmployeeLogin(req.body);
  const { email, password, type } = req.body;
  const admin = await employeeServ.findOne({ where: { email } });
  if (!admin) {
    throw new BadRequestError("Invalid Email or Password");
  }
  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) {
    throw new BadRequestError("Invalid Email or Password");
  }
  delete admin.password;
  const token = generateToken(admin.id);
  res.json({ admin, token });
}
export async function forgetPassword(req: Request, res: Response) {
  validateEmail(req.body);
  req.body.email = req.body.email.toLowerCase();
  const admin: any = await employeeServ.findOne({
    where: { email: req.body.email },
    attributes: ["id", "email"],
  });
  if (!admin) {
    throw new NotFoundError("The email address is not exist");
  }
  const otp = generateRandomDigitNumber(6);
  otpServ.deletePermanently({
    where: {
      adminId: admin.id,
    },
  });

  const created = await otpServ.createOne({
    otp,
    adminId: admin.id,
    validTo: new Date(new Date().getTime() + 10 * 60 * 1000),
  });

  sendEmail(
    [admin.email],
    `HMA TECH OTP`,
    `<p>Your OTP is <b>${otp}</b></p>
      <p style="color: red;"><strong>OTP is valid for 10 minutes</strong></p>`
  );

  res.json({
    data: { message: "Please check your email" },
    message: null,
  });
}

export async function otpValidation(req: Request, res: Response) {
  validateOtpValidation(req.body);

  req.body.email = req.body.email.toLowerCase();
  const { email, otp } = req.body;
  const admin = await employeeServ.findOne({
    where: {
      email,
    },
    attributes: ["id"],
  });
  if (!admin) {
    throw new NotFoundError("This email is not exist");
  }
  const existingOtp = await otpServ.findOne({
    where: {
      adminId: admin.id,
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

export async function updatePassword(req: Request, res: Response) {
  validateChangePasswordValidation(req.body);

  req.body.email = req.body.email.toLowerCase();
  const { email, password, confirmPassword, otp } = req.body;
  const admin = await employeeServ.findOne({
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
      adminId: admin.id,
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

  const isMatch = await comparePassword(password, admin.password);

  if (isMatch) {
    throw new UnprocessableEntityError(
      "Password must be different than the last one"
    );
  }

  const hashedPassword = await hashString(password);
  const updatedPassword: any = await employeeServ.update(
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
