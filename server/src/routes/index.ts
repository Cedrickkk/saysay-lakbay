import { verifyAccessToken } from "@/middlewares/token";
import auth from "@/routes/auth.routes";
import users from "@/routes/users.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", auth);

router.use("/users", verifyAccessToken, users);

export default router;
