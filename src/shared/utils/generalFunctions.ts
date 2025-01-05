import bcrypt from "bcrypt";
import { SALT } from "../constant";
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(SALT);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
export async function comparePassword (password, hashedPassword){
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Failed to compare passwords");
  }
}
