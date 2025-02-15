import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as itemController from "./controller";
import { authorize } from "../../../../middleware/authorization";
import { SystemUserTypes } from "../../../../shared/enums";

const itemRoutes = Router();
itemRoutes.use(asyncWrapper(authenticate))
itemRoutes.use(asyncWrapper(authorize(SystemUserTypes.Employee)))
itemRoutes
  .route("/") 
  .get(asyncWrapper(itemController.findAll))
  .post(asyncWrapper(itemController.create));
  itemRoutes
  .route("/:id")
  .get(asyncWrapper(itemController.findOne))
  .delete(asyncWrapper(itemController.deleteOne))
  .put(asyncWrapper(itemController.acceptRequest))

export default itemRoutes;
