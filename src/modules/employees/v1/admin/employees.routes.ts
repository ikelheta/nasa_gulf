import { Router } from "express";
import * as controller from "./employees.controller";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import { authorize } from "../../../../middleware/authorization";
import { SystemUserTypes } from "../../../../shared/enums";

const adminRoutes = Router();

adminRoutes.use(asyncWrapper(authenticate))
adminRoutes.use(asyncWrapper(authorize(SystemUserTypes.Admin)))
  .route("/")
  .post(asyncWrapper(controller.createEmployee))
  .get(asyncWrapper(controller.getAll))

adminRoutes
  .route("/profile")
  .get(asyncWrapper(controller.getProfile))
  .put(asyncWrapper(controller.updateProfile));
adminRoutes
  .route("/:id")
  .get(asyncWrapper(controller.getOne))
  .put(asyncWrapper(controller.updateOne))
  .delete(asyncWrapper(controller.deleteOne))

export default adminRoutes;
