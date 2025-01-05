import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { validate as uuidValidate } from "uuid";
import { BadRequestError } from "./app-error";
import { SALT } from "../constant";

export const hashString = async (str: string) => {
  const salt = await bcrypt.genSalt(SALT);
  const hashedScript = await bcrypt.hash(str, salt);
  return hashedScript;
};

export const isUUID = (value: any): boolean => {
  return typeof value === "string" && uuidValidate(value);
};
export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const convertTo12HourFormat = (time: string): string => {
  const [hoursStr, minutes, seconds] = time.split(":");
  let hours = parseInt(hoursStr);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes}:${seconds} ${period}`;
};

export const comparePassword = (loginPassword: string, realPassword: any) => {
  return bcrypt.compare(loginPassword, realPassword);
};

export function generateRandomPassword(length: number) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=?";
  let password = "";

  // Function to get a random character from the charset
  const getRandomChar = () =>
    charset[Math.floor(Math.random() * charset.length)];

  // Generate at least one of each required character type
  password += charset[Math.floor(Math.random() * 26)]; // Uppercase letter
  password += charset[Math.floor(Math.random() * 26) + 26]; // Lowercase letter
  password += charset[Math.floor(Math.random() * 10) + 52]; // Number
  password += charset[Math.floor(Math.random() * 16) + 62]; // Special character

  // Fill the rest of the password with random characters
  for (let i = 4; i < length; i++) {
    password += getRandomChar();
  }

  // Shuffle the password characters to mix things up
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

export function generateRandomDigitNumber(length: number) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return String(Math.floor(min + Math.random() * (max - min + 1)));
}

export function validateUUID(id?: string, errorMessage?: string) {
  if (!isUUID(id)) {
    throw new BadRequestError(errorMessage || "invalid id");
  }
}
export function validateArrayOfUUID(
  uuidArray: string[],
  message: string = "Invalid array of uuid"
) {
  for (let uuid of uuidArray) {
    validateUUID(uuid, message);
  }
}
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateSaudiPhoneNumber = () => {
  const prefix = "+9665 ";
  const randomDigits = faker.number
    .int({ min: 1000000, max: 9999999 })
    .toString();
  return `${prefix}${randomDigits}`;
};
