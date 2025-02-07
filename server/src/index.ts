import app from "@/app";
import {
  APP_PORT,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "@/utils/constants";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from "path";
import { db } from "./db";
import { users } from "./db/schema";
import { User } from "./types/user";
import { sendAuthCookies } from "./utils/auth";

const main = async () => {
  await migrate(db, {
    migrationsFolder: path.join(__dirname, "./db/migrations"),
  });

  app.use(passport.initialize());

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (_req, _accessToken, _refreshToken, profile, done) => {
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

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      session: false,
      scope: ["openid", "profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/status/failure",
      session: false,
    }),
    (req, res) => {
      sendAuthCookies(res, req.user as User);
      res.redirect("/status/success");
    }
  );

  app.get("/status/error", (req, res) => {
    res.send("ERRORRRRRRR");
  });

  app.get("/status/success", (req, res) => {
    res.send("SUCCESSSSSS");
  });

  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
};

main().catch((err) => console.log(err));
