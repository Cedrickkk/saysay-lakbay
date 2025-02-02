import { Router } from "express";
import { getUserById, getUsers } from "@/controllers/user-controller";

const router = Router();

router.route("/").get(getUsers);

router.route("/:id").get(getUserById);

export default router;
