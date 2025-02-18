import { db } from "@/db";
import { users } from "@/db/schema/users";
import { User } from "@/types/user";
import { NotFoundError } from "@/utils/errors";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getUsers = async (
  req: Request,
  res: Response<User[]> | Record<string, any>,
  next: NextFunction
) => {
  try {
    const result = await db.select().from(users);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request<User>,
  res: Response<User> | Record<string, any>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};
