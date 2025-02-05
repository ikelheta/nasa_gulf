import { Router } from "express";
import dashboardRoutes from "./admin/routes";
import employeeRoutes from "./employee/item.routes";

const adminsV1Routes = Router();

adminsV1Routes.use("/admin", dashboardRoutes);
adminsV1Routes.use("/employee", employeeRoutes);

export default adminsV1Routes;
