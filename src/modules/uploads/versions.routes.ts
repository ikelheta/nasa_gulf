import { Router } from "express";
import portalRoutes from "./v1/uploads.portals";

const uploadsRoutes = Router();

uploadsRoutes.use("/v1", portalRoutes);

export default uploadsRoutes;
