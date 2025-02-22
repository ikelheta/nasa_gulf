import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as contractorController from "./contractor.controller";
import { authorize } from "../../../../middleware/authorization";
import { SystemUserTypes } from "../../../../shared/enums";

const contractorRoutes = Router();
contractorRoutes.use(asyncWrapper(authenticate))
contractorRoutes.use(asyncWrapper(authorize(SystemUserTypes.Admin)))
contractorRoutes
  .route("/")
  .get(asyncWrapper(contractorController.findAll))
  .post(asyncWrapper(contractorController.create));
contractorRoutes
  .route("/:id")
  .get(asyncWrapper(contractorController.findOne))
  .put(asyncWrapper(contractorController.update))
  .delete(asyncWrapper(contractorController.deleteOne));

export default contractorRoutes;
