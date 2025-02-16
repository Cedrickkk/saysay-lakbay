import users from "@/routes/users.routes";
import { Router } from "express";

const router = Router();

router.use("/users", users);

export default router;
