import multer, { FileFilterCallback } from "multer";
import path from "path";
import { UnprocessableEntityError } from "./utils/app-error";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `file-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".HEIF", ".svg ", ".pdf",".xlsx"];
  const isValidExtension = allowedExtensions.includes(
    path.extname(file.originalname).toLowerCase()
  );
  if (isValidExtension) {
    cb(null, true);
  } else {
    cb(
      new UnprocessableEntityError(
        "Invalid file extension. Only JPG, JPEG, svg and PNG pdf xlsx are allowed."
      )
    );
  }
};


export const uploadImages = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});


