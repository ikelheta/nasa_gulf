import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as rolesController from "./roles.controller"
import { authorize } from "../../../../middleware/authorization";
import { SystemUserTypes } from "../../../../shared/enums";
const rolesRoutes = Router();
rolesRoutes.use(asyncWrapper(authenticate))
rolesRoutes.use(asyncWrapper(authorize(SystemUserTypes.Admin)))
rolesRoutes
    .route("/")
    .get(asyncWrapper(rolesController.findAll))
    .post(asyncWrapper(rolesController.create));
rolesRoutes
    .route("/:id")
    .get(asyncWrapper(rolesController.findOne))
    .put(asyncWrapper(rolesController.update))
    .delete(asyncWrapper(rolesController.deleteOne));

export default rolesRoutes;
