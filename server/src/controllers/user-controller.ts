import { getUserByIdService, getUsersService } from "@/service/user-service";
import { SuccessResponse } from "@/types/response";
import { User } from "@/types/user";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getUsers = async (
  req: Request,
  res: Response<SuccessResponse<User[]>>,
  next: NextFunction
) => {
  try {
    const users = await getUsersService();
    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request<User>,
  res: Response<SuccessResponse<User>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      success: true,
      data: user,
      message: "User found.",
    });
  } catch (error) {
    next(error);
  }
};
