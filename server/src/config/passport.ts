import { db } from "@/db";
import { users } from "@/db/schema";
import {
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "@/utils/constants";
import { eq } from "drizzle-orm";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

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
};
