import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as departmentController from "./departments.controller"
import { SystemUserTypes } from "../../../../shared/enums";
import { authorize } from "../../../../middleware/authorization";
const departmentRoutes = Router();
departmentRoutes.use(asyncWrapper(authenticate))
departmentRoutes.use(asyncWrapper(authorize(SystemUserTypes.Admin)))
departmentRoutes
    .route("/")
    .get(asyncWrapper(departmentController.findAll))
    .post(asyncWrapper(departmentController.create));
departmentRoutes
    .route("/:id")
    .get(asyncWrapper(departmentController.findOne))
    .put(asyncWrapper(departmentController.update))
    .delete(asyncWrapper(departmentController.deleteOne));

export default departmentRoutes;
