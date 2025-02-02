import { db } from "@/db";
import { SelectUser, users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const getUsers = async (
  req: Request,
  res: Response<SelectUser[]> | Record<string, any>
) => {
  try {
    const result = await db.select().from(users);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (
  req: Request<{ id: number }>,
  res: Response<SelectUser> | Record<string, any>
) => {
  try {
    const { id } = req.params;
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      return res.status(204).json({
        status: "ok",
        message: "No user found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
