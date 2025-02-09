import { ACCESS_TOKEN_SECRET } from "@/utils/constants";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    req.user = decoded;
    next();
  });
};
