import { Router } from "express";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";
import * as inventoryController from "./inventory.controller";
import { authorize } from "../../../../middleware/authorization";
import { SystemUserTypes } from "../../../../shared/enums";

const inventoryRoutes = Router();
inventoryRoutes.use(asyncWrapper(authenticate))
inventoryRoutes.use(asyncWrapper(authorize(SystemUserTypes.Admin)))
inventoryRoutes
  .route("/")
  .get(asyncWrapper(inventoryController.findAll))
  .post(asyncWrapper(inventoryController.create));
inventoryRoutes
  .route("/add_stock")
  .post(asyncWrapper(inventoryController.addToStock));
  inventoryRoutes
  .route("/current_stock/:id")
  .get(asyncWrapper(inventoryController.getCurrentStock));
  inventoryRoutes
  .route("/:id")
  .get(asyncWrapper(inventoryController.findOne))
  .put(asyncWrapper(inventoryController.update))
  .delete(asyncWrapper(inventoryController.deleteOne));

export default inventoryRoutes;
