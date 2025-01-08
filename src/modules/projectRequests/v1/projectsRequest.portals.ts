import { Router } from "express";
import adminRoutes from "./admin/projectsRequests.routes";
import employeeRoutes from "./employee/projectsRequests.routes";
import consultantRoutes from "./consultant/projectsRequests.routes";

const adminsV1Routes = Router();

adminsV1Routes.use("/admin", adminRoutes);
adminsV1Routes.use("/employee", employeeRoutes);
adminsV1Routes.use("/consultant", consultantRoutes);

export default adminsV1Routes;
