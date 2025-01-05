import { Router } from "express";
import * as authEmployee from "./auth.controller";
import asyncWrapper from "../../../../shared/utils/async-wrapper";

const authRoutes = Router();

authRoutes.route("/login").post(asyncWrapper(authEmployee.loginEmployee));
authRoutes.route("/forget_password").post(asyncWrapper(authEmployee.forgetPassword));
authRoutes.route("/otp").post(asyncWrapper(authEmployee.otpValidation));
authRoutes.route("/update_password").put(asyncWrapper(authEmployee.updatePassword));

export default authRoutes;
