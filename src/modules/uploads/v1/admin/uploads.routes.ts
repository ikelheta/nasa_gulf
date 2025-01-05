import { Router } from "express";

import asyncWrapper from "../../../../shared/utils/async-wrapper";
import { uploadImages } from "../../../../shared/upload";
import * as controller from "./uploads.controller";
const uploadRoutes = Router();

uploadRoutes
  .route("/file")
  .post(
    asyncWrapper(uploadImages.single("file")),
    asyncWrapper(controller.uploadImages)
  );

uploadRoutes
  .route("/files")
  .post(
    asyncWrapper(uploadImages.array("files")),
    asyncWrapper(controller.uploadImages)
  );

uploadRoutes.route("/:filename").delete(asyncWrapper(controller.deleteImage));

export default uploadRoutes;
