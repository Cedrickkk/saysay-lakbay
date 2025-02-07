import { db } from "@/db";
import { users } from "@/db/schema";
import { User } from "@/types/user";
import { eq } from "drizzle-orm";
import { CookieOptions, Response } from "express";
import * as jwt from "jsonwebtoken";
import { __prod__ } from "./constants";

export const generateToken = (user: User) => {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "30d" }
  );

  return { accessToken, refreshToken };
};

export const saveRefreshToken = async (
  userId: number,
  refreshToken: string
) => {
  await db.update(users).set({ refreshToken }).where(eq(users.id, userId));
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
};

export const revokeRefreshAccessToken = async (userId: number) => {
  await db
    .update(users)
    .set({ refreshToken: null })
    .where(eq(users.id, userId));
};

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: __prod__,
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  path: "/",
  domain: __prod__ ? `.${process.env.DOMAIN}` : "",
} as const;

export const sendAuthCookies = (res: Response, user: User) => {
  const { accessToken, refreshToken } = generateToken(user);

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);
};
