// import { InternalServerError, NotFoundError } from "../shared/app-error.mjs";
import { log } from "console";
import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import multer from "multer";

export default class AppErrorHandler {
  static async errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // if(err.statusCode !== 422) console.log(err);

    if (err instanceof multer.MulterError) {
      err = {
        message: err.message,
        statusCode: 422,
      };
    }

    const lang = req.headers["accept-language"] || "en";

    let message = err.message || err.error || err;
    if (err.message) {
      message = err.message[lang] || err.message;
    } else if (err.error) {
      message = err.error[lang] || err.error;
    } else if (err) {
      message = err[lang] || err;
    }
    log(err);
    res.status(err.statusCode || 500).json({
      data: err.data ? err.data : null,
      message: message || "Internal Server Error",
    });
  }
}
