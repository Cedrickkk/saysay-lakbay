import { User } from "@/types/user";
import { sendAuthCookies } from "@/utils/auth";
import { FRONTEND_URL } from "@/utils/constants";
import { Router } from "express";
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
    sendAuthCookies(res, req.user as User);
    res.redirect(FRONTEND_URL);
  }
);

export default router;
