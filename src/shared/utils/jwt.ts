import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // Replace with your secret key
const JWT_EXPIRATION = process.env.JWT_SECRE || "1d"; // Set your token expiration time

export const generateToken = (id: string, type): string => {
  return jwt.sign({ id, type }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};