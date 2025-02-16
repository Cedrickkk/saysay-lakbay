import { SelectUser } from "@/db/schema";
import { isAuthenticated } from "@/middlewares/auth";
import { sendAuthCookies } from "@/utils/cookies";
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
    sendAuthCookies(res, req.user as SelectUser);
    res.redirect(`${FRONTEND_URL}`);
  }
);

router.get("/status", isAuthenticated, (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
    user: req.user,
  });
});

export default router;
