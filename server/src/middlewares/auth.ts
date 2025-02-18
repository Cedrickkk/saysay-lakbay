import { ACCESS_TOKEN_SECRET } from "@/utils/constants";
import { BadRequestError, UnauthorizedError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new UnauthorizedError("Access token is required.");
  }

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err) {
      throw new BadRequestError("Invalid access token received.");
    }

    req.user = decoded;
    next();
  });
};
