import { db } from "@/db";
import { insertUserEmailSchema, users } from "@/db/schema";
import { isAuthenticated } from "@/middlewares/auth";
import { validateData } from "@/middlewares/validation";
import { NewEmailUser, User } from "@/types/user";
import { FRONTEND_URL } from "@/utils/constants";
import { sendAuthCookies } from "@/utils/cookies";
import { ConflictError, UnauthorizedError } from "@/utils/errors";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["openid", "profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/status/failure",
    session: false,
  }),
  (req, res) => {
    sendAuthCookies(res, req.user! as User);
    console.log(FRONTEND_URL);
    res.redirect(`${FRONTEND_URL}/`);
  }
);

router.post(
  "/sign-up",
  validateData(insertUserEmailSchema),
  async (
    req: Request<{}, {}, NewEmailUser>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, name } = req.body;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email.toLowerCase()),
      });

      if (existingUser) {
        throw new ConflictError("Email already registered.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [newUser] = await db
        .insert(users)
        .values({
          email: email.toLowerCase(),
          name,
          password: hashedPassword,
          googleId: "",
        })
        .returning();

      sendAuthCookies(res, newUser as User);

      res.status(StatusCodes.CREATED).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: User, info: { message: string }) => {
      if (err) return next(err);
      if (!user) throw new UnauthorizedError(info.message);

      sendAuthCookies(res, user as User);
      res.status(StatusCodes.OK).json(user);
    }
  )(req, res, next);
});

router.get("/status", isAuthenticated, (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
    user: req.user,
  });
});

export default router;
