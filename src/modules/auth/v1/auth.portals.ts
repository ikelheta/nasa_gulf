import { Router } from "express";
import adminRoutes from "./admin/auth.routes";
import employeeRoutes from "./employee/auth.routes";
import consultantRoutes from "./consultant/auth.routes";

const authV1Routes = Router();

authV1Routes.use("/admin", adminRoutes);
authV1Routes.use("/employee", employeeRoutes);
authV1Routes.use("/consultant", consultantRoutes);

export default authV1Routes;
