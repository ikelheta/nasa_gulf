import { Request, Response, NextFunction } from "express";
const asyncWrapper =
  (fn: any) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncWrapper;
