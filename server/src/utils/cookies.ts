import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CookieOptions, Response } from "express";
import * as jwt from "jsonwebtoken";
import { __prod__ } from "./constants";
import { User } from "@/types/user";

export const generateToken = (user: User) => {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15min" }
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

export const revokeRefreshAccessToken = async (userId: number) => {
  await db
    .update(users)
    .set({ refreshToken: null })
    .where(eq(users.id, userId));
};

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: __prod__,
  domain: __prod__ ? `.${process.env.DOMAIN}` : "",
};

const accessTokenCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: 1000 * 60 * 15,
} as const;

const refreshTokenCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: 1000 * 60 * 60 * 24 * 30,
} as const;

export const sendAuthCookies = (res: Response, user: User) => {
  const { accessToken, refreshToken } = generateToken(user);

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
};
