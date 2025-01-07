import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as projectrRequestController from "./projectsRequests.controller";
import { authorize } from "../../../../middleware/authorization";
import { SystemUserTypes } from "../../../../shared/enums";

const projectRequestRoutes = Router();
projectRequestRoutes.use(asyncWrapper(authenticate))
projectRequestRoutes.use(asyncWrapper(authorize(SystemUserTypes.Admin)))

projectRequestRoutes
  .route("/")
  .post(asyncWrapper(projectrRequestController.create));
projectRequestRoutes
  .route("/:id")
  .get(asyncWrapper(projectrRequestController.findOne))
  .put(asyncWrapper(projectrRequestController.update))
  .delete(asyncWrapper(projectrRequestController.deleteOne));

export default projectRequestRoutes;
