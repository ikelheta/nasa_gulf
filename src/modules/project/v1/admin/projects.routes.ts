import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as projectrController from "./projects.controller";

const contractorRoutes = Router();

contractorRoutes
  .route("/")
  .get(asyncWrapper(projectrController.findAll))
  .post(asyncWrapper(projectrController.create));
contractorRoutes
  .route("/:id")
  .get(asyncWrapper(projectrController.findOne))
  .put(asyncWrapper(projectrController.update))
  .delete(asyncWrapper(projectrController.deleteOne));

export default contractorRoutes;
