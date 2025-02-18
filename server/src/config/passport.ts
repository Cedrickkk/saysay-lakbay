import { db } from "@/db";
import { users } from "@/db/schema";
import {
  ACCESS_TOKEN_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "@/utils/constants";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { Request } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

export const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          let user = await db.query.users.findFirst({
            where: eq(users.googleId, profile.id),
          });

          if (!user) {
            [user] = await db
              .insert(users)
              .values({
                name: profile.displayName,
                email: profile._json.email ?? "",
                googleId: profile.id,
              })
              .returning();
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user) return done(null, false, { message: "Incorrect email." });

          const isValidPassword = await bcrypt.compare(
            password,
            user.password!
          );

          if (!isValidPassword) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: (req: Request) => req.cookies.accessToken,
        secretOrKey: ACCESS_TOKEN_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await db.query.users.findFirst({
            where: eq(users.id, jwtPayload.userId),
          });

          if (!user) {
            return done(null, false, { message: "Access Token is required." });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
