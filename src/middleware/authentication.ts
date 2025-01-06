import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { SystemUserTypes } from "../shared/enums";
import adminServ from "../modules/admins/v1/admin/admins.service";
import employeeServ from "../modules/employees/v1/admin/employees.service";
import { BadRequestError, UnAuthorizedError } from "../shared/utils/app-error";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // Replace with your secret key

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      type: string;
    };
    if (decoded.type == SystemUserTypes.Admin) {
      const admin = await adminServ.findById(decoded.id, { attributes: { exclude: ['password'] } });
      req.user = { ...admin, type: SystemUserTypes.Admin }; // Attach user info to request object
      return next();
      

    }
    if (decoded.type == SystemUserTypes.Employee) {
      const employee = await employeeServ.findById(decoded.id, { attributes: { exclude: ['password'] } });
      req.user = { ...employee, type: SystemUserTypes.Employee }; // Attach user info to request object
      return next();

    }
    throw new UnAuthorizedError()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
