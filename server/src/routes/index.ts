import { isAuthenticated } from "@/middlewares/auth";
import users from "@/routes/users.routes";
import { Router } from "express";

const router = Router();

router.use("/users", isAuthenticated, users);

export default router;
