import { Router } from "express";
import * as AdminController from "./admins.controller";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import { SystemUserTypes } from "../../../../shared/enums";
import { authorize } from "../../../../middleware/authorization";

const adminRoutes = Router();
// adminRoutes.use(asyncWrapper(authenticate))
// adminRoutes.use(asyncWrapper(authorize(SystemUserTypes.Admin)))
adminRoutes
  .route("/")
  .post(asyncWrapper(AdminController.createAdmin))
  .get(asyncWrapper(AdminController.getAll))
adminRoutes
  .route("/profile")
  .get(asyncWrapper(AdminController.getProfile))
  .put(asyncWrapper(AdminController.updateProfile));
adminRoutes
  .route("/:id")
  .get(asyncWrapper(AdminController.getOne))
  .put(asyncWrapper(AdminController.updateOne))
  .delete(asyncWrapper(AdminController.deleteOne))



export default adminRoutes;
