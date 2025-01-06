import { Router } from "express";
import * as controller from "./employees.controller";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";

const adminRoutes = Router();

// adminRoutes.use(asyncWrapper(authenticate("jwt")));
adminRoutes
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
