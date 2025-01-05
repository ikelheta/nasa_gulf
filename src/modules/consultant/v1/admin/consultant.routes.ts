import { Router } from "express";
import * as consultantController from "./consultant.controller";
import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { authenticate } from "../../../../middleware/authentication";

const consultantRoutes = Router();
consultantRoutes
  .route("/")
  .post(asyncWrapper(consultantController.createConsultant))
  .get(asyncWrapper(consultantController.getAll))
consultantRoutes
  .route("/:id")
  .get(asyncWrapper(consultantController.getOne))
  .put(asyncWrapper(consultantController.updateOne))

consultantRoutes
  .route("/profile")
  .get(asyncWrapper(consultantController.getProfile))
  .put(asyncWrapper(consultantController.updateProfile));
export default consultantRoutes;
