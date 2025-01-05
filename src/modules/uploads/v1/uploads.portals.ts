import { Router } from "express";
import dashboardRoutes from "./admin/uploads.routes";

const uploadsV1Routes = Router();

uploadsV1Routes.use("/admin", dashboardRoutes);

export default uploadsV1Routes;
