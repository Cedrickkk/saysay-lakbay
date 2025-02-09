import { verifyAccessToken } from "@/middlewares/token";
import users from "@/routes/users.routes";
import { Router } from "express";

const router = Router();

router.use("/users", verifyAccessToken, users);

export default router;
