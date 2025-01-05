import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as rolesController from "./roles.controller"
const rolesRoutes = Router();

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
