import { Router } from "express";
import * as AdminController from "./admins.controller";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";

const adminRoutes = Router();
adminRoutes
  .route("/")
  .post(asyncWrapper(AdminController.createAdmin))
  .get(asyncWrapper(AdminController.getAll))
  adminRoutes
  .route("/:id")
  .get(asyncWrapper(AdminController.getOne))
  .put(asyncWrapper(AdminController.updateOne))

adminRoutes
  .route("/profile")
  .get(asyncWrapper(AdminController.getProfile))
  .put(asyncWrapper(AdminController.updateProfile));

export default adminRoutes;
