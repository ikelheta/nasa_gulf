import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as itemController from "./item.controller";
import { authorize } from "../../../../middleware/authorization";
import { SystemUserTypes } from "../../../../shared/enums";

const itemRoutes = Router();
itemRoutes.use(asyncWrapper(authenticate))
itemRoutes.use(asyncWrapper(authorize(SystemUserTypes.Admin)))
itemRoutes
  .route("/")
  .get(asyncWrapper(itemController.findAll))
  .post(asyncWrapper(itemController.create));
  itemRoutes
  .route("/:id")
  .get(asyncWrapper(itemController.findOne))
  .put(asyncWrapper(itemController.update))
  .delete(asyncWrapper(itemController.deleteOne));

export default itemRoutes;
