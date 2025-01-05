import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // Replace with your secret key
const JWT_EXPIRATION = process.env.JWT_SECRE || "1d"; // Set your token expiration time

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};