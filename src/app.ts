import cors from "cors";
import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
// import asyncWrapper from "./shared/utils/async-wrapper";
// import { authenticate } from "./middleware/authentication";

import "./config/db/config";
import createTables from "./config/db/tables";
import AppErrorHandler from "./shared/app-error/error-handler";
import authRoutes from "./modules/auth/versions.routes";
import adminRoutes from "./modules/admins/versions.routes";
import departmentRoutes from "./modules/departments/versions.routes";
import roleRoutes from "./modules/roles/versions.routes";
import employeeRoutes from "./modules/employees/versions.routes"
import contractorRoutes from "./modules/contractor/versions.routes"
import projectRoutes from "./modules/project/versions.routes"
import projectRequestsRoutes from "./modules/projectRequests/versions.routes"
import consultantRoutes from "./modules/consultant/versions.routes"
import itemRoutes from "./modules/items/versions.routes"
import inventoryRoutes from "./modules/inventories/versions.routes"

import uploadRoutes from "./modules/uploads/versions.routes";
import Otp from "./modules/otp/v1/otp.model";
import setupAssociations from "./config/db/associations";

process.env.TZ = "Asia/Riyadh";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5000, // Limit each IP to 5000 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

const app = express();

app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(
  "/uploads",
  // asyncWrapper(authenticate("jwt")),
  express.static(path.join(__dirname, "../uploads"))
);
app.use(express.static("public"));
app.use(morgan("combined"));
app.use('/auth', authRoutes)
app.use('/admins', adminRoutes)
app.use('/departments', departmentRoutes)
app.use('/roles', roleRoutes)
app.use('/employees', employeeRoutes)
app.use('/contractors', contractorRoutes)
app.use('/projects', projectRoutes)
app.use('/project_requests', projectRequestsRoutes)
app.use('/consultants', consultantRoutes)
app.use('/items', itemRoutes)
app.use('/inventories', inventoryRoutes)
app.use("/upload", uploadRoutes);





app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(AppErrorHandler.errorHandler);

const PORT = process.env.PORT || 9091;

const start = async (): Promise<void> => {
  try {
    setupAssociations()

    // await createTables();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
