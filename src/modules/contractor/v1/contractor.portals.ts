import { Router } from "express";
import dashboardRoutes from "./dashboard/contractor.routes";

const adminsV1Routes = Router();

adminsV1Routes.use("/admin", dashboardRoutes);

export default adminsV1Routes;
