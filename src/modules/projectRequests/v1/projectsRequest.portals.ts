import { Router } from "express";
import adminRoutes from "./admin/projectsRequests.routes";
import employeeRoutes from "./employee/projectsRequests.routes";

const adminsV1Routes = Router();

adminsV1Routes.use("/admin", adminRoutes);
adminsV1Routes.use("/employee", employeeRoutes);

export default adminsV1Routes;
