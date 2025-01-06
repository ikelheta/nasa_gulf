import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as projectrController from "./projects.controller";
import { authorize } from "../../../../middleware/authorization";
import { SystemUserTypes } from "../../../../shared/enums";

const contractorRoutes = Router();
contractorRoutes.use(asyncWrapper(authenticate))
contractorRoutes.use(asyncWrapper(authorize(SystemUserTypes.Consultant)))

contractorRoutes
  .route("/")
  .get(asyncWrapper(projectrController.findAll))
contractorRoutes
  .route("/:id")
  .get(asyncWrapper(projectrController.findOne))


export default contractorRoutes;
