import { Router } from "express";
import * as AuthController from "./auth.controller";
import asyncWrapper from "../../../../shared/utils/async-wrapper";

// const authController = new AuthController();
const authRoutes = Router();

authRoutes.route("/login").post(asyncWrapper(AuthController.loginAdmin));
authRoutes.route("/forget_password").post(asyncWrapper(AuthController.forgetPassword));
authRoutes.route("/otp").post(asyncWrapper(AuthController.otpValidation));
authRoutes.route("/update_password").put(asyncWrapper(AuthController.updatePassword));

export default authRoutes;
