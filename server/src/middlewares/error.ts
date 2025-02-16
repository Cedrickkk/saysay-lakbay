import { makeError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express";

export async function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error, statusCode } = makeError(err);
  res.status(statusCode).json({ error, statusCode });
  next();
}
